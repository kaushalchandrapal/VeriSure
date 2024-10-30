import { Navigate, Outlet } from 'react-router-dom';

const LoggedOutErrorBoundary = () => {
  const accessToken = sessionStorage.getItem('accessToken');

  return accessToken ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default LoggedOutErrorBoundary;
