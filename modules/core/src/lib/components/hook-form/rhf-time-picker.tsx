import { Box } from '@mui/material';
import { PickerChangeHandlerContext, TimePicker, TimeValidationError } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

import { Iconify } from '../iconify';

type Props = {
  name: string;
  label?: string;
  highlightRed?: boolean;
  format?: string;
  fullWidth?: boolean;
  maxDate?: string;
  minDate?: string;
  helperText?: string;
  size?: string;
  minutesStep?: number;
  timeSteps?: { hours: number; minutes: number };
  disabled?: boolean;
  timezone?: string;
  onChange?: (value: dayjs.Dayjs | null, context: PickerChangeHandlerContext<TimeValidationError>) => void;
};

const RHFTimePicker = ({
  name,
  helperText,
  label,
  format,
  disabled,
  highlightRed,
  fullWidth,
  maxDate,
  minDate,
  minutesStep,
  timeSteps,
  size,
  timezone,
  ...other
}: Props) => {
  const { control, watch } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TimePicker
          minutesStep={minutesStep}
          label={label}
          disabled={disabled}
          timezone={timezone}
          timeSteps={timeSteps}
          maxDate={maxDate}
          minDate={minDate}
          {...field}
          {...other}
          sx={{
            width: fullWidth ? '100%' : 'auto',
            '& .MuiOutlinedInput-input': {
              padding: size ? '8.5px 14px' : '16.5px 14px',
            },
            '& .MuiInputLabel-root:not(.MuiInputLabel-shrink)': {
              transform: size ? 'translate(14px, 8px) scale(1)' : 'initial',
            },
          }}
          value={watch(name) ? dayjs(watch(name)) : null}
          slots={{
            openPickerIcon: () => <Iconify icon="solar:calendar-bold-duotone" />,
          }}
          slotProps={{
            textField: {
              helperText: error ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Iconify icon="mingcute:alert-fill" />
                  {error?.message}
                </Box>
              ) : (
                helperText
              ),
              error: !!error,
            },
            popper: { placement: 'bottom-end' },
          }}
        />
      )}
    />
  );
};

export default RHFTimePicker;
