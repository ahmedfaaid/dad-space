export type User = {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt?: Date;
};

export type AuthState = {
  authContext: any;
  user: User;
};

export type ModalState = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export type Post = {
  id: string;
  headline: string;
  text: string;
  topic: Topic;
  postedBy: User;
  voteCount: number;
  votes?: Vote[];
  voteStatus?: number;
  comments: Comment[];
  createdAt?: Date;
};

export type Topic = {
  id?: string;
  name: string;
  description?: string;
  slug?: string;
};

export type Comment = {
  id: string;
  text?: string;
  postedBy?: User;
  parent?: Comment;
  children?: Comment[];
  createdAt?: Date;
};

export type Vote = {
  id: string;
  value: number;
  user?: User;
  post?: Post;
  createdAt?: Date;
  updatedAt?: Date;
};
