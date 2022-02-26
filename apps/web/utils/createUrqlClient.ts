import { createClient, dedupExchange, fetchExchange } from 'urql';
import { gql } from '@urql/core';
import { cacheExchange } from '@urql/exchange-graphcache';
import { VoteMutationVariables } from 'dad-gql';

export const createUrqlClient = createClient({
  url: 'http://localhost:5500/v1',
  fetchOptions: {
    credentials: 'include'
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
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
                    voteCount
                    voteStatus
                  }
                `,
                { id: postId, voteCount: newCount, voteStatus: value }
              );
            }
          }
        }
      }
    }),
    fetchExchange
  ]
});
