export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type AuthState = {
  authContext: any;
  user: User;
};
