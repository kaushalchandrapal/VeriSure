import { jwtDecode } from '@verisure-core';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useTokenErrorBoundary = (): boolean => {
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
          setHasError(true);
        }
      }
    };

    checkTokenExpiry();

    if (hasError) {
      localStorage.removeItem('accessToken');
      navigate('/login');
    }
  }, [hasError, navigate]);

  return hasError;
};

export default useTokenErrorBoundary;
