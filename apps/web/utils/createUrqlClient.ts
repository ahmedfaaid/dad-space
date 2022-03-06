import { createClient, dedupExchange, fetchExchange } from 'urql';
import { gql } from '@urql/core';
import { cacheExchange } from '@urql/exchange-graphcache';
import {
  CreateCommentMutationVariables,
  VoteMutationVariables,
  CommentsResponse,
  DeleteCommentMutationVariables
} from 'dad-gql';

export const createUrqlClient = createClient({
  url: 'http://localhost:5500/v1',
  fetchOptions: {
    credentials: 'include'
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      keys: {
        PostResponse: () => null
      },
      updates: {
        Mutation: {
          vote: (_result, args, cache, _info) => {
            const { postId, value } = args as VoteMutationVariables;

            const data = cache.readFragment(
              gql`
                fragment _ on Post {
                  id
                  voteCount
                  voteStatus
                }
              `,
              { id: postId }
            );

            if (data) {
              if (data.voteStatus === value) {
                return;
              }

              const newCount =
                data.voteCount + (!data.voteCount ? 1 : 2) * value;

              cache.writeFragment(
                gql`
                  fragment __ on Post {
                    id
                    voteCount
                    voteStatus
                  }
                `,
                { id: postId, voteCount: newCount, voteStatus: value }
              );
            }
          },
          createComment: (result, args, cache, _info) => {
            const {
              comment: { postId }
            } = args as CreateCommentMutationVariables;
            const { comments } = result.createComment as CommentsResponse;

            const data = cache.readFragment(
              gql`
                fragment _ on Post {
                  comments {
                    id
                    text
                    postedBy {
                      id
                      firstName
                      lastName
                    }
                    createdAt
                  }
                }
              `,
              { id: postId }
            );

            if (data) {
              const newCommentsList = [comments[0], ...data.comments];

              cache.writeFragment(
                gql`
                  fragment __ on Post {
                    comments {
                      id
                      text
                      postedBy {
                        id
                        firstName
                        lastName
                      }
                      createdAt
                    }
                  }
                `,
                { id: postId, comments: newCommentsList }
              );
            }
          },
          deleteComment: (_result, args, cache, info) => {
            const { commentId } = args as DeleteCommentMutationVariables;

            const POST = gql`
              query Post($id: String!) {
                post(id: $id) {
                  post {
                    id
                    comments {
                      id
                      text
                      postedBy {
                        id
                        firstName
                        lastName
                      }
                      createdAt
                    }
                  }
                }
              }
            `;

            cache
              .inspectFields('Query')
              .filter(field => field.fieldName === 'post')
              .forEach(field => {
                cache.updateQuery(
                  {
                    query: POST,
                    variables: { id: field.arguments.id }
                  },
                  data => {
                    data.post.post.comments = data.post.post.comments.filter(
                      comment => comment.id !== commentId
                    );
                    return data;
                  }
                );
              });
          }
        }
      }
    }),
    fetchExchange
  ]
});
