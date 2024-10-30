import React, { ReactNode } from 'react';
import useTokenErrorBoundary from './hooks/use-login';

interface TokenErrorBoundaryProps {
  children: ReactNode;
}

const TokenErrorBoundary: React.FC<TokenErrorBoundaryProps> = ({ children }) => {
  const hasError = useTokenErrorBoundary();

  if (hasError) {
    return <h1>Session expired. Redirecting to login...</h1>;
  }

  return <>{children}</>;
};

export default TokenErrorBoundary;
