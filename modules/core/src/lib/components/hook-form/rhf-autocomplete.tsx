import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useRef } from 'react';
import { Controller, ControllerFieldState, ControllerRenderProps, FieldError, FieldValues, useFormContext } from 'react-hook-form';

import { KeyMaskProps, useKeyMask } from '../key-mask';
import ErrorComponent from './error-component';

export interface RHFAutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: React.ReactNode;
  options: ReadonlyArray<T>;
  TextFieldProps?: TextFieldProps;
  keyMask?: KeyMaskProps;
  shouldDirty?: boolean;

  // Helper callback functions to get & set the underlying form control value
  useGetSetMethods?: boolean;
  getSelectedValue?: (fieldValue: string) => any;
  setSelectedValue?: (option: any) => any;
}

interface AutoCompleteError extends FieldError {
  value?: {
    message: string;
  };
  label?: {
    message: string;
  };
}

export function RHFAutocomplete<T, Multiple extends boolean | undefined, DisableClearable extends boolean | undefined, FreeSolo extends boolean | undefined>({
  name,
  label,
  placeholder,
  helperText,
  options,
  TextFieldProps,
  keyMask = {},
  useGetSetMethods = false,
  shouldDirty = false,
  setSelectedValue = (newValue) => {
    if (useGetSetMethods) {
      // Autocomplete multiple prop present?
      if (Array.isArray(newValue)) {
        return newValue.map((option) => {
          return typeof option === 'string' ? option : option.value;
        });
      }

      if (newValue === null) {
        return '';
      }

      return newValue?.value;
    }

    return newValue;
  },
  getSelectedValue = (fieldValue) => {
    if (useGetSetMethods) {
      // Autocomplete multiple prop present?
      if (Array.isArray(fieldValue)) {
        return options.filter((option: any) => {
          return fieldValue.includes(typeof option === 'string' ? option : option.value);
        });
      }

      return options.find((option: any) => {
        return fieldValue === (typeof option === 'string' ? option : option.value);
      });
    }

    return fieldValue;
  },

  ...other
}: Readonly<Omit<RHFAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>, 'renderInput'>>) {
  const { control, setValue } = useFormContext();
  const fieldRef = useRef<HTMLInputElement>(null);

  useKeyMask({ fieldRef, keyMask });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }: { field: ControllerRenderProps<FieldValues, string>; fieldState: ControllerFieldState }) => {
        const error = fieldState?.error as AutoCompleteError | undefined;

        return (
          <Autocomplete
            {...field}
            value={getSelectedValue(field.value) || null}
            options={options}
            onChange={(_, newValue) => setValue(name, setSelectedValue(newValue), { shouldValidate: true, shouldDirty: shouldDirty })}
            isOptionEqualToValue={(option) => (typeof option === 'string' ? option === field?.value : option?.label === field?.value?.label)}
            renderInput={(params) => (
              <TextField
                label={label}
                placeholder={placeholder}
                error={!!error}
                helperText={error ? <ErrorComponent message={error?.message ?? error?.label?.message ?? error?.value?.message} /> : helperText}
                inputRef={fieldRef}
                {...TextFieldProps}
                {...params}
              />
            )}
            {...other}
          />
        );
      }}
    />
  );
}
