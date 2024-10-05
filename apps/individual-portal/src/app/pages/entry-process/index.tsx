import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoadingScreen, enqueueSnackbar } from '@verisure-core';
import { RouterLinks } from '../../app-route-paths';

const EntryProcessPage = () => {
  const navigate = useNavigate();
  const hasEffectRun = useRef(false);

  useEffect(() => {
    if (hasEffectRun.current) return;
    hasEffectRun.current = true;

  }, []);

  return <LoadingScreen />;
};

export default EntryProcessPage;
