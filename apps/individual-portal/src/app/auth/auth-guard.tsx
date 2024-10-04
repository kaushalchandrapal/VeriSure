import { useCallback, useEffect } from 'react';

import { jwtDecode } from '@verisure-core';

import { useNavigate } from 'react-router';
import { RouterLinks } from '../app-route-paths';
import { isValidToken, setSession, STORAGE_KEY } from './jwt';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: Props) {
  const navigate = useNavigate();

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      // if (accessToken && isValidToken(accessToken)) {
      //   setSession(accessToken);
      //   const decodedToken = jwtDecode(accessToken);
      //   // if (decodedToken?.username) {
      //   //   const res = await UserServiceAPIs().userDetails({ userId: decodedToken?.username ?? '' });
      //   //   updateUser(res.data?.responseItems?.[0]);
      //   // }
      // } else {
      //   navigate(RouterLinks.login);
      // }
    } catch (error) {
      console.error(error);
    }
  }, [navigate]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}
