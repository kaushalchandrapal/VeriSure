import { useEffect, useRef } from 'react';

export const useEffectOneTime = (addedFunction: () => void): void => {
  const hasEffectRun = useRef(false);

  useEffect(() => {
    if (hasEffectRun.current) return;
    hasEffectRun.current = true;

    addedFunction();
  }, [addedFunction]);
};

export default useEffectOneTime;
