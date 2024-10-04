import { Box, InputBaseComponentProps, TextField, TextFieldProps } from '@mui/material';
import * as React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { NumberFormatValues, NumericFormat, NumericFormatProps, PatternFormat, PatternFormatProps } from 'react-number-format';
import { Iconify } from '../iconify';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  format?: string;
  isAllowed?: (values: NumberFormatValues) => boolean;
  thousandSeparator?: boolean;
  decimalScale?: number;
}

type Props = TextFieldProps & {
  name: string;
  label?: string;
  patternFormat?: boolean;
  allowLeadingZeros?: boolean;
  highlightRed?: boolean;
  suffix?: string;
  thousandSeparator?: boolean;
  fixedDecimalScale?: boolean;
  decimalScale?: number;
};

const NumericFormatCustom = React.memo(
  React.forwardRef<NumericFormatProps, CustomProps>((props, ref) => {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        valueIsNumericString
        isAllowed={other?.isAllowed}
        thousandSeparator={other?.thousandSeparator}
        decimalScale={2}
      />
    );
  })
);

const PatternFormatCustom = React.memo(
  React.forwardRef<PatternFormatProps, CustomProps>((props, ref) => {
    const { onChange, ...other } = props;

    return (
      <PatternFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        valueIsNumericString
        format={other?.format ?? '##-##-##'}
      />
    );
  })
);

const MyInputComponent = React.forwardRef<InputBaseComponentProps, any>((props) => {
  const { component: Component, ...other } = props;

  return <Component {...other} />;
});

export default function RHFReactNumberFormat({ name, helperText, label, ...other }: Props) {
  const { control } = useFormContext();
  const inputRef = React.useRef(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          value={typeof field.value === 'number' && field.value === 0 ? 0 : field.value}
          error={!!error}
          helperText={
            error ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Iconify icon="mingcute:alert-fill" />
                {error?.message}
              </Box>
            ) : (
              helperText
            )
          }
          {...other}
          inputRef={inputRef}
          InputLabelProps={{
            shrink: !!field.value || !!other.InputProps?.startAdornment,
          }}
          InputProps={{
            ...(other?.InputProps ?? {}),
            inputComponent: MyInputComponent,
            inputProps: {
              component: other.patternFormat ? PatternFormatCustom : NumericFormatCustom,
              ...other,
            },
          }}
          sx={{
            ...other?.sx,
            backgroundColor: other?.highlightRed ? '#FEE2E2' : 'inherit',
          }}
        />
      )}
    />
  );
}
