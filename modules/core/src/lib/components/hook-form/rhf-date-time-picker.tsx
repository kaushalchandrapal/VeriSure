import { DateTimePicker, DateTimePickerProps } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { Controller, useFormContext, FieldValues } from 'react-hook-form';
import ErrorComponent from './error-component';
import { Iconify } from '../iconify';

interface IRHFDateTimePickerType extends Omit<DateTimePickerProps<Dayjs>, 'renderInput' | 'value'> {
  name: string;
  label?: string;
  helperText?: string;
  highlightRed?: boolean;
}

const DEFAULT_FORMAT = 'DD/MM/YYYY HH:mm';

const RHFDateTimePicker = ({ name, helperText, format = DEFAULT_FORMAT, highlightRed, slotProps, ...other }: IRHFDateTimePickerType) => {
  const { control, watch } = useFormContext<FieldValues>();

  const value = watch(name);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DateTimePicker
          {...field}
          {...other}
          format={format}
          value={value ? dayjs(value) : null}
          onChange={(newValue) => field.onChange(newValue?.toISOString())}
          slotProps={{
            ...slotProps,
            textField: {
              ...slotProps?.textField,
              helperText: error ? <ErrorComponent message={error?.message} /> : helperText,
              error: !!error,
            },
          }}
          slots={{
            openPickerIcon: () => <Iconify icon="solar:calendar-bold-duotone" />,
          }}
        />
      )}
    />
  );
};

export default RHFDateTimePicker;
