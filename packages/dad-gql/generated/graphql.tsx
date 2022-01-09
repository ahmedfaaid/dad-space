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
  children: Array<Comment>;
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
  postedById: Scalars['String'];
  text: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createPost: Post;
  login?: Maybe<User>;
  logout: Scalars['Boolean'];
  signup?: Maybe<User>;
};


export type MutationCreateCommentArgs = {
  comment: CommentInput;
};


export type MutationCreatePostArgs = {
  post: PostInput;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignupArgs = {
  user: UserInput;
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
};

export type PostInput = {
  headline: Scalars['String'];
  text: Scalars['String'];
  topicID: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  comment: Comment;
  comments: Array<Comment>;
  me?: Maybe<User>;
  post: Post;
  posts: Array<Post>;
  user: User;
  users: Array<User>;
};


export type QueryCommentArgs = {
  id: Scalars['String'];
};


export type QueryPostArgs = {
  id: Scalars['String'];
};

export type Topic = {
  __typename?: 'Topic';
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  moderators: Array<User>;
  name: Scalars['String'];
  posts: Array<Post>;
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
};

export type UserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

export type SignupMutationVariables = Exact<{
  user: UserInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup?: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, createdAt: any } | null | undefined };


export const SignupDocument = gql`
    mutation Signup($user: UserInput!) {
  signup(user: $user) {
    id
    firstName
    lastName
    email
    createdAt
  }
}
    `;

export function useSignupMutation() {
  return Urql.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument);
};