import { Navigate, Outlet } from 'react-router-dom';

const LoggedInErrorBoundary = () => {
  const accessToken = sessionStorage.getItem('accessToken');
  if (accessToken) {
    return <Navigate to="/" replace />;
  } else {
    return <Outlet />;
  }
};

export default LoggedInErrorBoundary;
