import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate, Outlet } from 'react-router-dom';

import { CompactErrorPage, MainLayout } from '@verisure-commons';
import { LoadingScreen } from '@verisure-core';
import { AuthGuard } from '../auth/auth-guard';

const AdminDashboardPage = lazy(() => import('../pages/dashboard/admin'));

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
            path: 'admin-dashboard',
            element: <AdminDashboardPage />,
          },
          {
            path: '',
            element: <Navigate to="admin-dashboard" replace />,
          },
        ],
      },
    ],
  },
];

export default DashboardRoutes;
