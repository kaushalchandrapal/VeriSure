import { forwardRef } from 'react';
import { KeyMaskProps, useKeyMask } from '.';

export const KeyMask = forwardRef<HTMLInputElement, { keyMask: KeyMaskProps; children?: React.ReactNode }>(({ keyMask, children }, ref) => {
  useKeyMask({ fieldRef: ref, keyMask });

  return children;
});

export default KeyMask;
