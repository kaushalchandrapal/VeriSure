// ----------------------------------------------------------------------

import { TextareaAutosize, TextareaAutosizeProps, Typography, alpha, useTheme } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type ResizeOptions = 'none' | 'both' | 'horizontal' | 'vertical' | undefined;

type Props = TextareaAutosizeProps & {
  name: string;
  label?: string;
  helperText?: string;
  hideBorder?: boolean;
  resize?: ResizeOptions;
};

export default function RHFTextArea({ name, helperText, label, resize = 'vertical', ...other }: Props) {
  const { control } = useFormContext();
  const theme = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const border = `1px solid ${!error ? alpha(theme?.palette?.grey[500], 0.2) : '#EF4444'}`;

        return (
          <>
            <TextareaAutosize
              {...field}
              style={{
                borderRadius: '6px',
                fontWeight: '400',
                fontSize: '15px',
                width: '100%',
                padding: '10px 12px',
                height: 'unset',
                backgroundColor: theme?.palette?.background?.paper,
                resize: resize,
                outline: '0',
                fontFamily: 'Lato ,sans-serif',
                border: other.hideBorder ? 'none' : border,
                lineHeight: '22px'
              }}
              {...other}
            />
            <Typography color={error ? 'error' : 'secondary'} sx={{ fontSize: '12px' }}>
              {error?.message || helperText || error}
            </Typography>
          </>
        );
      }}
    />
  );
}
