import { ForwardedRef, RefObject, useCallback, useDebugValue } from 'react';

import { KeyMaskType } from '.';
import { useEventListener } from '../../hooks/use-event-listener';

const IgnoreKeyboardKeys = [
  "Meta", // prettier-ignore
  'Enter',
  'Backspace',
  'Delete',
  'Tab',
  'Escape',
  'Home',
  'End',
  'PageUp',
  'PageDown',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Add',
  'PrintScreen',
];

export type KeyMaskProps = {
  allowedKeyCodes?: RegExp | string;
  minDigits?: number;
  maxDigits?: number;
};

export type UseKeyMaskProps = {
  fieldRef: ForwardedRef<HTMLInputElement>;
  keyMask: KeyMaskProps;
};

export function useKeyMask({ fieldRef, keyMask: { allowedKeyCodes = KeyMaskType.all, maxDigits, minDigits } }: UseKeyMaskProps) {
  useDebugValue({ allowedKeyCodes, maxDigits, minDigits });

  const onKeyDownHandler = useCallback(
    (evt: KeyboardEvent) => {
      if (
        !evt.key || // NOTE: Google auto complete removes the key
        evt.altKey ||
        evt.ctrlKey ||
        evt.metaKey ||
        IgnoreKeyboardKeys.includes(evt.key) ||
        (allowedKeyCodes && evt.key.match(allowedKeyCodes) === null)
      ) {
        return;
      }

      evt.preventDefault();
    },
    [allowedKeyCodes]
  );

  const onInputHandler = useCallback(
    (evt: Event) => {
      const targetEl = evt.target as HTMLInputElement;
      const originalValue = targetEl.value;
      const minValue = minDigits || 0;
      const maxValue = maxDigits;
      const cursorStartPosition = (targetEl.selectionStart || 0) - 1;
      const cursorEndPosition = (targetEl.selectionEnd || 0) - 1;

      let sanitizedValue = originalValue.replace(allowedKeyCodes, '');

      if (maxValue != null) {
        const value = Number.parseInt(originalValue, 10);

        if ((!Number.isNaN(value) && value > maxValue) || value < minValue) {
          sanitizedValue = originalValue.slice(0, cursorStartPosition) + originalValue.slice(cursorStartPosition + 1, originalValue.length);
        }
      }

      if (originalValue !== sanitizedValue) {
        targetEl.value = sanitizedValue;

        // Fix for jumping cursor position after replacing the text via Cut, Copy & Paste
        targetEl.setSelectionRange(cursorStartPosition, cursorEndPosition);
      }
    },
    [allowedKeyCodes, maxDigits, minDigits]
  );

  const onPasteHandler = useCallback(
    (evt: ClipboardEvent) => {
      const minValue = minDigits || 0;
      const maxValue = maxDigits;

      if (maxValue != null) {
        const newValue = Number.parseInt(evt.clipboardData!.getData('text'), 10);

        if (Number.isNaN(newValue) || newValue > maxValue || newValue < minValue) {
          evt.preventDefault();
        }
      }
    },
    [maxDigits, minDigits]
  );

  useEventListener('keydown', onKeyDownHandler, fieldRef as RefObject<HTMLInputElement>);
  useEventListener('input', onInputHandler, fieldRef as RefObject<HTMLInputElement>);
  useEventListener('paste', onPasteHandler, fieldRef as RefObject<HTMLInputElement>);
}

export default useKeyMask;
