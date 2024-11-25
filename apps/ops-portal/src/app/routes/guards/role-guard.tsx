import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { jwtDecode } from '@verisure-core';
import { isValidToken, STORAGE_KEY } from '../../auth/jwt';
import { RouterLinks } from '../../app-route-paths';

type Props = {
  allowedRoles: string[]; // Roles allowed for the specific route
  children: React.ReactNode;
};

export function RoleGuard({ allowedRoles, children }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = sessionStorage.getItem(STORAGE_KEY);

    if (!accessToken || !isValidToken(accessToken)) {
      navigate(RouterLinks.login);
      return;
    }

    const decodedToken = jwtDecode(accessToken);
    
    if (!decodedToken || !allowedRoles.includes(decodedToken.role)) {
      navigate(RouterLinks.unauthorized);
      return;
    }
  }, [allowedRoles, navigate]);

  return <>{children}</>;
}
