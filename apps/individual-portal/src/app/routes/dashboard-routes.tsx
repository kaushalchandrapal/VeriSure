import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate, Outlet } from 'react-router-dom';

import { CompactErrorPage, MainLayout } from '@verisure-commons';
import { LoadingScreen } from '@verisure-core';
import { AuthGuard } from '../auth/auth-guard';

const UserDashboardPage = lazy(() => import('../pages/dashboard/user-dashboard'));

const DashboardRoutes = [
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        element: (
          <ErrorBoundary FallbackComponent={CompactErrorPage}>
            <MainLayout>
              <Suspense fallback={<LoadingScreen />}>
                <AuthGuard>
                  <Outlet />
                </AuthGuard>
              </Suspense>
            </MainLayout>
          </ErrorBoundary>
        ),
        children: [
          {
            path: 'user-dashboard',
            element: <UserDashboardPage />,
          },
          {
            path: '',
            element: <Navigate to="user-dashboard" replace />,
          },
        ],
      },
    ],
  },
];

export default DashboardRoutes;
