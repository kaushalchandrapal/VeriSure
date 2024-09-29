import { Navigate, useRoutes } from 'react-router-dom';

import MainLayout from 'src/layouts/main';

// import { PATH_AFTER_LOGIN } from 'src/config-global';
import { authRoutes } from './auth';
import { authDemoRoutes } from './auth-demo';
import { HomePage } from './main';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    ...authRoutes,

    { path: '*', element: <Navigate to="/auth/jwt/login" replace /> },
  ]);
}
