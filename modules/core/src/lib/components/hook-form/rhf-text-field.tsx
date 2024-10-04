import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { KeyMaskProps, useKeyMask } from '../key-mask';
import ErrorComponent from './error-component';

// ----------------------------------------------------------------------

export type RHFTextFieldProps = TextFieldProps & {
  name: string;
  keyMask?: KeyMaskProps;
};

export function RHFTextField({ name, helperText, type, keyMask = {}, ...other }: RHFTextFieldProps) {
  const { control } = useFormContext();
  const fieldRef = useRef<HTMLInputElement>(null);

  useKeyMask({ fieldRef, keyMask });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          value={type === 'number' && field.value === 0 ? '' : field.value}
          onChange={(event) => {
            if (type === 'number') {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
          }}
          error={!!error}
          helperText={error?.message ? <ErrorComponent message={error?.message} /> : helperText}
          inputRef={fieldRef}
          {...other}
        />
      )}
    />
  );
}
