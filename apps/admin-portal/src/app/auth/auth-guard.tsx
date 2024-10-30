import dayjs from 'dayjs';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { jwtDecode } from '@verisure-core';
import { RouterLinks } from '../app-route-paths';
import { isValidToken, setSession, STORAGE_KEY } from './jwt';

type Props = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: Props) {
  const navigate = useNavigate();

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        const decodedToken = jwtDecode(accessToken);

        if (decodedToken?.exp) {
          const expiryDateTime = new Date(decodedToken.exp * 1000);
          const isExpired = dayjs().isAfter(dayjs(expiryDateTime));

          if (isExpired) {
            navigate(RouterLinks.login);
          }
        }
      } else {
        navigate(RouterLinks.login);
      }
    } catch (error) {
      console.error("Session check failed:", error);
      navigate(RouterLinks.login);
    }
  }, [navigate]);

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return <>{children}</>;
}
