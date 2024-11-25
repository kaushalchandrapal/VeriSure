import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate, Outlet } from 'react-router-dom';

import { CompactErrorPage, MainLayout } from '@verisure-commons';
import { jwtDecode, LoadingScreen } from '@verisure-core';
import { AuthGuard } from '../auth/auth-guard';
import DashboardLayout from '../layouts/dashboard';
import { RouterLinks } from '../app-route-paths';
import { RoleGuard } from './guards/role-guard';

const WorkerDashboardMain = lazy(() => import('../pages/dashboard/worker-dashboard'));
const SupervisorDashboardMain = lazy(() => import('../pages/dashboard/supervisor-dashboard'));
const ViewCasePageWorker = lazy(() => import('../pages/dashboard/worker-dashboard/view-case'));
// const MyKycPage = lazy(() => import('../pages/dashboard/my-kyc'));
// const RequestNewKycPage = lazy(() => import('../pages/dashboard/request-new-kyc'));

const RedirectBasedOnRole = () => {
  const accessToken = sessionStorage.getItem('accessToken');
  const decodedToken = accessToken ? jwtDecode(accessToken) : null;

  if (decodedToken?.role === 'Worker') {
    return <Navigate to="/dashboard/worker/worker-dashboard" replace />;
  }
  if (decodedToken?.role === 'Supervisor') {
    return <Navigate to="/dashboard/supervisor/supervisor-dashboard" replace />;
  }
  return <Navigate to="/login" replace />; // Default to login if no role
};

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
            path: 'worker',
            children: [
              {
                path: 'worker-dashboard',
                element: (
                  <Suspense fallback={<LoadingScreen />}>
                    <RoleGuard allowedRoles={['Worker']}>
                      <WorkerDashboardMain />
                    </RoleGuard>
                  </Suspense>
                ),
              },
              {
                path: 'worker-view-case',
                element: (
                  <Suspense fallback={<LoadingScreen />}>
                    <RoleGuard allowedRoles={['Worker']}>
                      <ViewCasePageWorker />
                    </RoleGuard>
                  </Suspense>
                ),
              },
              {
                path: '',
                element: <Navigate to="worker-dashboard" replace />,
              },
            ],
          },
          {
            path: 'supervisor',
            children: [
              {
                path: 'supervisor-dashboard',
                element: (
                  <Suspense fallback={<LoadingScreen />}>
                    <RoleGuard allowedRoles={['Supervisor']}>
                      <SupervisorDashboardMain />
                    </RoleGuard>
                  </Suspense>
                ),
              },
              {
                path: '',
                element: <Navigate to="supervisor-dashboard" replace />,
              },
            ],
          },
          {
            path: '',
            element: <RedirectBasedOnRole />,
          },
        ],
      },
    ],
  },
];

export default DashboardRoutes;
