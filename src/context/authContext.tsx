import React, {
  createContext,
  useCallback,
  useMemo,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { loginYandex, logoutYandex } from '../utils/oAuthYa';

interface AuthContextProps {
  login: () => void;
  currentUser: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
  };
}

const Context = createContext<AuthContextProps | null>(null);

type TProps = {
  children: ReactNode;
};

const AuthProvider: React.FC<TProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');

    if (savedUser) {
      return JSON.parse(savedUser);
    }
    return null;
  });

  const login = useCallback(() => {
    window.location.href = import.meta.env.VITE_LOGIN_URL;
  }, []);

  const logout = useCallback(() => {
    logoutYandex(currentUser?.access_token);
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  }, [currentUser?.access_token]);

  const handleRedirect = useCallback(async () => {
    const url = new URL(`${window.location}`);
    const urlParams = new URLSearchParams(url.search);
    const authorizationCode = urlParams.get('code');

    if (authorizationCode && !currentUser) {
      const data = await loginYandex(authorizationCode);
      localStorage.setItem('currentUser', JSON.stringify(data));
      setCurrentUser(data);
    }

    if (authorizationCode) {
      url.search = '';
      window.location.href = `${url}`;
    }
  }, [currentUser]);

  useEffect(() => {
    handleRedirect();
  }, [handleRedirect]);

  const value = useMemo(() => {
    return {
      login,
      logout,
      currentUser,
      handleRedirect,
    };
  }, [login, logout, currentUser, handleRedirect]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useAuthContext = (): AuthContextProps => {
  return useContext(Context) as AuthContextProps;
};

export default AuthProvider;
