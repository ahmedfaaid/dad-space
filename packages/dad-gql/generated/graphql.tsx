import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Comment = {
  __typename?: 'Comment';
  children?: Maybe<Array<Comment>>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  parent?: Maybe<Comment>;
  post: Post;
  postedBy: User;
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CommentInput = {
  parentId?: InputMaybe<Scalars['String']>;
  postId: Scalars['String'];
  text: Scalars['String'];
};

export type CommentsResponse = {
  __typename?: 'CommentsResponse';
  comments?: Maybe<Array<Comment>>;
  errors?: Maybe<Array<Error>>;
};

export type Error = {
  __typename?: 'Error';
  message: Scalars['String'];
  path: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: CommentsResponse;
  createPost: PostResponse;
  forgotPassword: Scalars['Boolean'];
  login?: Maybe<UserResponse>;
  logout: Scalars['Boolean'];
  resetPassword: UserResponse;
  signup?: Maybe<UserResponse>;
  vote: Scalars['Boolean'];
};


export type MutationCreateCommentArgs = {
  comment: CommentInput;
};


export type MutationCreatePostArgs = {
  post: PostInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationSignupArgs = {
  user: UserInput;
};


export type MutationVoteArgs = {
  postId: Scalars['String'];
  value: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  comments: Array<Comment>;
  createdAt: Scalars['DateTime'];
  headline: Scalars['String'];
  id: Scalars['ID'];
  postedBy: User;
  text: Scalars['String'];
  topic: Topic;
  updatedAt: Scalars['DateTime'];
  voteCount: Scalars['Int'];
  voteStatus?: Maybe<Scalars['Int']>;
  votes?: Maybe<Array<Vote>>;
};

export type PostInput = {
  headline: Scalars['String'];
  text: Scalars['String'];
  topicID: Scalars['String'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  errors?: Maybe<Array<Error>>;
  post?: Maybe<Post>;
};

export type Query = {
  __typename?: 'Query';
  comment: Comment;
  comments: Array<Comment>;
  me?: Maybe<User>;
  post: PostResponse;
  posts: Array<Post>;
  topics: Array<Topic>;
  user: User;
  users: Array<User>;
};


export type QueryCommentArgs = {
  id: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['String'];
};


export type QueryPostsArgs = {
  limit: Scalars['Int'];
  skip: Scalars['Int'];
};


export type QueryTopicsArgs = {
  query?: InputMaybe<Scalars['String']>;
};

export type Topic = {
  __typename?: 'Topic';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  moderators?: Maybe<Array<User>>;
  name: Scalars['String'];
  posts?: Maybe<Array<Post>>;
  updatedAt: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  comments: Array<Comment>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  lastName: Scalars['String'];
  moderates: Array<Topic>;
  posts: Array<Post>;
  updatedAt: Scalars['DateTime'];
  votes?: Maybe<Array<Vote>>;
};

export type UserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<Error>>;
  user?: Maybe<User>;
};

export type Vote = {
  __typename?: 'Vote';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  post: Post;
  updatedAt: Scalars['DateTime'];
  user: User;
  value: Scalars['Int'];
};

export type ErrorFragmentFragment = { __typename?: 'Error', path: string, message: string };

export type UserFragmentFragment = { __typename?: 'User', id: string, firstName: string, lastName: string, email: string };

export type CreatePostMutationVariables = Exact<{
  post: PostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostResponse', post?: { __typename?: 'Post', id: string, headline: string, text: string, topic: { __typename?: 'Topic', name: string } } | null | undefined, errors?: Array<{ __typename?: 'Error', path: string, message: string }> | null | undefined } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null | undefined, errors?: Array<{ __typename?: 'Error', path: string, message: string }> | null | undefined } | null | undefined };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type ResetPasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string } | null | undefined, errors?: Array<{ __typename?: 'Error', path: string, message: string }> | null | undefined } };

export type SignupMutationVariables = Exact<{
  user: UserInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup?: { __typename?: 'UserResponse', user?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, createdAt: any } | null | undefined, errors?: Array<{ __typename?: 'Error', path: string, message: string }> | null | undefined } | null | undefined };

export type VoteMutationVariables = Exact<{
  value: Scalars['Int'];
  postId: Scalars['String'];
}>;


export type VoteMutation = { __typename?: 'Mutation', vote: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string } | null | undefined };

export type PostQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type PostQuery = { __typename?: 'Query', post: { __typename?: 'PostResponse', post?: { __typename?: 'Post', id: string, headline: string, text: string, voteCount: number, voteStatus?: number | null | undefined, createdAt: any, topic: { __typename?: 'Topic', id: string, name: string }, postedBy: { __typename?: 'User', id: string, firstName: string, lastName: string }, votes?: Array<{ __typename?: 'Vote', id: string, value: number, user: { __typename?: 'User', id: string } }> | null | undefined, comments: Array<{ __typename?: 'Comment', id: string, text: string, createdAt: any, postedBy: { __typename?: 'User', id: string, firstName: string, lastName: string } }> } | null | undefined, errors?: Array<{ __typename?: 'Error', path: string, message: string }> | null | undefined } };

export type PostsQueryVariables = Exact<{
  skip: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: string, headline: string, text: string, createdAt: any, voteCount: number, voteStatus?: number | null | undefined, topic: { __typename?: 'Topic', name: string }, postedBy: { __typename?: 'User', id: string, firstName: string, lastName: string }, votes?: Array<{ __typename?: 'Vote', id: string, value: number, user: { __typename?: 'User', id: string } }> | null | undefined, comments: Array<{ __typename?: 'Comment', id: string }> }> };

export type TopicsQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']>;
}>;


export type TopicsQuery = { __typename?: 'Query', topics: Array<{ __typename?: 'Topic', id: string, name: string }> };

export const ErrorFragmentFragmentDoc = gql`
    fragment ErrorFragment on Error {
  path
  message
}
    `;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  firstName
  lastName
  email
}
    `;
export const CreatePostDocument = gql`
    mutation CreatePost($post: PostInput!) {
  createPost(post: $post) {
    post {
      id
      headline
      text
      topic {
        name
      }
    }
    errors {
      path
      message
    }
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      id
      firstName
      lastName
      email
    }
    errors {
      path
      message
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const ResetPasswordDocument = gql`
    mutation ResetPassword($newPassword: String!, $token: String!) {
  resetPassword(newPassword: $newPassword, token: $token) {
    user {
      ...UserFragment
    }
    errors {
      ...ErrorFragment
    }
  }
}
    ${UserFragmentFragmentDoc}
${ErrorFragmentFragmentDoc}`;

export function useResetPasswordMutation() {
  return Urql.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument);
};
export const SignupDocument = gql`
    mutation Signup($user: UserInput!) {
  signup(user: $user) {
    user {
      id
      firstName
      lastName
      email
      createdAt
    }
    errors {
      path
      message
    }
  }
}
    `;

export function useSignupMutation() {
  return Urql.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument);
};
export const VoteDocument = gql`
    mutation Vote($value: Int!, $postId: String!) {
  vote(value: $value, postId: $postId)
}
    `;

export function useVoteMutation() {
  return Urql.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    firstName
    lastName
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PostDocument = gql`
    query Post($id: String!) {
  post(id: $id) {
    post {
      id
      headline
      text
      topic {
        id
        name
      }
      postedBy {
        id
        firstName
        lastName
      }
      voteCount
      voteStatus
      votes {
        id
        value
        user {
          id
        }
      }
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
      createdAt
    }
    errors {
      path
      message
    }
  }
}
    `;

export function usePostQuery(options: Omit<Urql.UseQueryArgs<PostQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostQuery>({ query: PostDocument, ...options });
};
export const PostsDocument = gql`
    query Posts($skip: Int!, $limit: Int!) {
  posts(skip: $skip, limit: $limit) {
    id
    headline
    text
    createdAt
    topic {
      name
    }
    postedBy {
      id
      firstName
      lastName
    }
    voteCount
    voteStatus
    votes {
      id
      value
      user {
        id
      }
    }
    comments {
      id
    }
  }
}
    `;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};
export const TopicsDocument = gql`
    query Topics($query: String) {
  topics(query: $query) {
    id
    name
  }
}
    `;

export function useTopicsQuery(options: Omit<Urql.UseQueryArgs<TopicsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TopicsQuery>({ query: TopicsDocument, ...options });
};