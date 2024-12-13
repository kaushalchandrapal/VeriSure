import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate, Outlet } from 'react-router-dom';

import { CompactErrorPage, MainLayout } from '@verisure-commons';
import { LoadingScreen } from '@verisure-core';
import { AuthGuard } from '../auth/auth-guard';
import DashboardLayout from '../layouts/dashboard';

const AdminDashboardPage = lazy(() => import('../pages/dashboard/admin'));
const UserManagementPage = lazy(() => import('../pages/dashboard/user-management'));
const CreateNewUserPage = lazy(() => import('../pages/dashboard/create-new-user'));

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
            path: 'admin-dashboard',
            element: <AdminDashboardPage />,
          },
          {
            path: 'user-management',
            element: <UserManagementPage />,
          },
          {
            path: 'create-new-user',
            element: <CreateNewUserPage />,
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
