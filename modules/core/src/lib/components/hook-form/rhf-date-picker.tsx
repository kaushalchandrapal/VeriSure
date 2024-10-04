import { Box } from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Controller, FieldValues, useFormContext } from 'react-hook-form';
import { Iconify } from '../iconify';

export interface RHFDatePickerProps extends Omit<DatePickerProps<FieldValues>, 'value' | 'onChange'> {
  name: string;
  helperText?: React.ReactNode;
  label?: string;
  format?: string;
  highlightRed?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium';
}

export const RHFDatePicker = ({ name, helperText, label, format, highlightRed, fullWidth, size = 'small', ...other }: RHFDatePickerProps) => {
  const { control, watch } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          format={format ?? 'DD/MM/YYYY'}
          label={label}
          {...field}
          {...other}
          value={watch(name) ? dayjs(watch(name)) : null}
          slots={{
            openPickerIcon: () => <Iconify icon="solar:calendar-bold-duotone" />,
          }}
          slotProps={{
            textField: {
              ...other.slotProps?.textField,
              size,
              fullWidth: fullWidth,
              helperText: error ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Iconify icon="mingcute:alert-fill" />
                  {error?.message}
                </Box>
              ) : (
                helperText
              ),
              error: !!error,
              placeholder: format ?? 'DD/MM/YYYY',
            },
            popper: { placement: 'bottom-end' },
          }}
        />
      )}
    />
  );
};
