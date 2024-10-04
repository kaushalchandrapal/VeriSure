import { useCallback, useEffect, useState } from 'react';

// Define the type for the callback function
type CallbackFunction = (...args: any[]) => void;

// Define the return type of the hook
interface UseDebounceResult {
  debouncedCallback: (...args: any[]) => void;
  isReady: boolean;
}

// Define the hook with types
export function useDebounceSearch(callback: CallbackFunction, delay: number): UseDebounceResult {
  const [args, setArgs] = useState<any[]>([]);
  const [isReady, setIsReady] = useState<boolean>(true);

  const debouncedCallback = useCallback((...newArgs: any[]) => {
    setIsReady(false);
    setArgs(newArgs);
  }, []);

  useEffect(() => {
    if (args.length === 0) return;

    const handler = setTimeout(() => {
      callback(...args);
      setIsReady(true);
    }, delay);

    return () => clearTimeout(handler);
  }, [args, delay]);

  return { debouncedCallback, isReady };
}
