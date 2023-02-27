import {
  useForgotPasswordMutation,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useResetPasswordMutation,
  useSignupMutation
} from 'dad-gql';
import { createContext, useEffect, useMemo, useState } from 'react';
import { AuthState, User } from '../types';

const AuthContext = createContext<AuthState>(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [{ data }] = useMeQuery();
  const [, login] = useLoginMutation();
  const [, signup] = useSignupMutation();
  const [, logout] = useLogoutMutation();
  const [, forgotPassword] = useForgotPasswordMutation();
  const [, resetPassword] = useResetPasswordMutation();

  useEffect(() => {
    if (data?.me) {
      setUser(data.me);
    } else {
      setUser(null);
    }
  }, [data]);

  const authContext = useMemo(
    () => ({
      login: async data => {
        const res = await login(data);

        if (res.data?.login.errors) {
          setUser(null);
          return { ok: false, errors: res.data.login.errors[0].message };
        } else if (res.data?.login.users) {
          setUser(res.data.login.users[0]);
          return { ok: true };
        }
      },
      signup: async data => {
        const res = await signup({ user: data });

        if (res.data?.signup.errors) {
          setUser(null);
          return { ok: false, errors: res.data.signup.errors[0].message };
        } else if (res.data?.signup.users) {
          setUser(res.data.signup.users[0]);
          return { ok: true };
        }
      },
      logout: async () => {
        setUser(null);
        await logout();
      },
      forgotPassword: async email => {
        await forgotPassword(email);

        return { ok: true };
      },
      resetPassword: async data => {
        const res = await resetPassword(data);

        if (res.data?.resetPassword.errors) {
          setUser(null);
          return {
            ok: false,
            errors: res.data.resetPassword.errors[0].message
          };
        } else if (res.data?.resetPassword.users) {
          setUser(res.data.resetPassword.users[0]);
          return { ok: true };
        }
      }
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <AuthContext.Provider value={{ user, authContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
