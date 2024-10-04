import { useEffect, useMemo } from 'react';
import NProgress from 'nprogress';
//
import StyledProgressBar from './styles';

// ----------------------------------------------------------------------

export function ProgressBar() {
  NProgress.configure({ showSpinner: false });

  useMemo(() => {
    NProgress.start();
  }, []);

  useEffect(() => {
    NProgress.done();
  }, []);

  return <StyledProgressBar />;
}

export default ProgressBar;
