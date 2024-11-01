import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate, Outlet } from 'react-router-dom';

import { LoginLayout, CompactErrorPage } from '@verisure-commons';
import { LoadingScreen } from '@verisure-core';
import LoggedInErrorBoundary from './error-boundries/logged-in';

const LoginPage = lazy(() => import('../pages/auth/login'));
const RegisterPage = lazy(() => import('../pages/auth/register'));

const AuthRoutes = [
  {
    path: 'auth',
    element: <LoggedInErrorBoundary />,
    children: [
      {
        path: '',
        element: (
          <ErrorBoundary FallbackComponent={CompactErrorPage}>
            <LoginLayout>
              <Suspense fallback={<LoadingScreen />}>
                <Outlet />
              </Suspense>
            </LoginLayout>
          </ErrorBoundary>
        ),
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'register',
            element: <RegisterPage />,
          },
          {
            path: '',
            element: <Navigate to="login" replace />,
          },
        ],
      },
    ],
  },
];

export default AuthRoutes;
