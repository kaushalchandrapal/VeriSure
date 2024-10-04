import { useCallback, useMemo, useState } from 'react';

import { isEqual } from '../utils/helper';

// ----------------------------------------------------------------------

export type UseSetStateReturn<T> = {
  state: T;
  canReset: boolean;
  onResetState: () => void;
  setState: (updateState: T | Partial<T>) => void;
  setField: (name: keyof T, updateValue: T[keyof T]) => void;
};

export function useSetState<T>(initialState: T): UseSetStateReturn<T> {
  const [state, setStateFunc] = useState(initialState);

  const canReset = !isEqual(state, initialState);

  const setState = useCallback((updateState: T | Partial<T>) => {
    setStateFunc((prevValue) => ({ ...prevValue, ...updateState }));
  }, []);

  const setField = useCallback(
    (name: keyof T, updateValue: T[keyof T]) => {
      setState({ [name]: updateValue } as Partial<T>);
    },
    [setState]
  );

  const onResetState = useCallback(() => {
    setStateFunc(initialState);
  }, [initialState]);

  const memoizedValue = useMemo(
    () => ({
      state,
      setState,
      setField,
      onResetState,
      canReset,
    }),
    [canReset, onResetState, setField, setState, state]
  );

  return memoizedValue;
}
