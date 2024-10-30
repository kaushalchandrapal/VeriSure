import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoadingScreen } from '@verisure-core';

const EntryProcessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('accessToken')) {
      navigate('/auth/login');
    } else {
      navigate('/dashboard');
    }
  }, []);

  return <LoadingScreen />;
};

export default EntryProcessPage;
