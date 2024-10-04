import { MuiOtpInput, MuiOtpInputProps } from 'mui-one-time-password-input';
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { TextFieldPropsSizeOverrides } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

// ----------------------------------------------------------------------

export type RHFCodesProps = MuiOtpInputProps & {
  name: string;
  size?: TextFieldPropsSizeOverrides;
  errorState?: boolean;
};

export default function RHFCode({ name, size = 'medium', errorState = false, ...other }: RHFCodesProps) {
  const { control } = useFormContext();

  const handlePaste = (e: any, field: any) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text/plain').trim(); // Remove leading and trailing spaces
    field.onChange(pastedText);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <MuiOtpInput
            {...field}
            autoFocus
            gap={1.5}
            length={6}
            TextFieldsProps={{
              error: (!!error) || errorState,
              placeholder: '-',
              size: size
            }}
            onPaste={(e) => {
              handlePaste(e, field);
            }}
            {...other}
          />

          {error && (
            <FormHelperText sx={{ px: 2 }} error>
              {error.message}
            </FormHelperText>
          )}
        </div>
      )}
    />
  );
}
