import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate, Outlet } from 'react-router-dom';

import { CompactErrorPage, MainLayout } from '@verisure-commons';
import { LoadingScreen } from '@verisure-core';
import { AuthGuard } from '../auth/auth-guard';
import DashboardLayout from '../layouts/dashboard';
import { RouterLinks } from '../app-route-paths';

const UserDashboardPage = lazy(() => import('../pages/dashboard/user-dashboard'));
const MyKycPage = lazy(() => import('../pages/dashboard/my-kyc'));
const RequestNewKycPage = lazy(() => import('../pages/dashboard/request-new-kyc'));

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
            path: 'kyc',
            element: <Outlet />,
            children: [
              {
                path: 'my-kyc',
                element: <MyKycPage />,
              },
              {
                path: 'request-new-kyc',
                element: <RequestNewKycPage />,
              },
              {
                path: '',
                element: <Navigate to={RouterLinks.myKyc} replace />,
              },
            ],
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
