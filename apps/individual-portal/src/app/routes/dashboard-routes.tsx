import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate, Outlet } from 'react-router-dom';

import { CompactErrorPage, MainLayout } from '@verisure-commons';
import { LoadingScreen } from '@verisure-core';
import { AuthGuard } from '../auth/auth-guard';
import DashboardLayout from '../layouts/dashboard';

const UserDashboardPage = lazy(() => import('../pages/dashboard/user-dashboard'));
const MyKycPage = lazy(() => import('../pages/dashboard/my-kyc'));

const DashboardRoutes = [
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        element: (
          <ErrorBoundary FallbackComponent={CompactErrorPage}>
            <DashboardLayout>
              <Suspense fallback={<LoadingScreen />}>
                <AuthGuard>
                  <Outlet />
                </AuthGuard>
              </Suspense>
            </DashboardLayout>
          </ErrorBoundary>
        ),
        children: [
          {
            path: 'user-dashboard',
            element: <UserDashboardPage />,
          },
          {
            path: 'my-kyc',
            element: <MyKycPage />,
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
