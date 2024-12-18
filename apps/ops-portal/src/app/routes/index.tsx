import { Fragment, lazy, ReactNode, Suspense, useCallback, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouteObject, RouterProvider } from 'react-router-dom';

import { axiosInstance, enqueueSnackbar, LoadingScreen } from '@verisure-core';
import { ErrorStatusCodes, ServerErrorMessage } from '@verisure-services';
import { CompactErrorPage, CompactLayout, Page404, MainLayout, Page403 } from '@verisure-commons';
import AuthRoutes from './auth-routes';
import { AuthGuard } from '../auth/auth-guard';
import LoggedOutErrorBoundary from './error-boundries/logged-out';
import DashboardRoutes from './dashboard-routes';

const EntryProcessPage = lazy(() => import('../pages/entry-process'));

// ----------------------------------------------------------------------

interface IRoute {
  path?: string;
  index?: boolean;
  element?: ReactNode;
  children?: IRoute[];
}

export default function Router() {
  axiosInstance.interceptors.response.use(
    (response) => {
      if (ErrorStatusCodes?.includes(response.status)) {
        enqueueSnackbar(ServerErrorMessage, {
          variant: 'error',
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        });
      }

      return response;
    },
    (error) => {
      if (ErrorStatusCodes?.includes(error?.response?.status)) {
        enqueueSnackbar(ServerErrorMessage, {
          variant: 'error',
          autoHideDuration: 5000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
        });
      }

      return Promise.reject(error);
    }
  );

  const routes = useMemo(
    (): RouteObject[] => [
      {
        path: '/',
        element: <LoggedOutErrorBoundary />,
        children: [
          {
            path: '',
            element: (
              <ErrorBoundary FallbackComponent={CompactErrorPage}>
                <Suspense fallback={<LoadingScreen />}>
                  <AuthGuard>
                    <MainLayout>
                      <EntryProcessPage />
                    </MainLayout>
                  </AuthGuard>
                </Suspense>
              </ErrorBoundary>
            ),
          },
        ],
      },
      ...AuthRoutes,
      ...DashboardRoutes,
      {
        path: 'access-denied',
        errorElement: <Page403 />,
        element: (
          <CompactLayout>
            <Page403 />
          </CompactLayout>
        ),
      },
      {
        path: '404',
        errorElement: <Page404 />,
        element: (
          <CompactLayout>
            <Page404 />
          </CompactLayout>
        ),
      },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
    []
  );

  const convertRoutes = useCallback((rs?: IRoute[]) => {
    return rs?.map((route) => (
      <Fragment key={route?.path}>
        <Route 
          path={route.path} 
          index={route.index === true ? undefined : route.index}
          element={route.element}
        >
          {convertRoutes(route?.children)}
        </Route>
      </Fragment>
    ));
  }, []);
  const componentRoutes = useMemo(() => convertRoutes(routes), [convertRoutes, routes]);

  const router = createBrowserRouter(createRoutesFromElements(componentRoutes));
  return <RouterProvider router={router} />;
}
