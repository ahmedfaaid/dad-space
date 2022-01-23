export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  createdAt?: Date;
};

export type AuthState = {
  authContext: any;
  user: User;
};

export type Post = {
  id: string;
  headline: string;
  text: string;
  topic: Topic;
  postedBy: User;
  comments: Comment[];
  createdAt?: Date;
};

export type Topic = {
  id?: string;
  name: string;
  description?: string;
};

export type Comment = {
  id: string;
};
