import { alpha, SxProps, Tooltip, useTheme } from '@mui/material';
import { DateValidationError, PickerChangeHandlerContext, PickersDay } from '@mui/x-date-pickers';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

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
  disableFuture?: boolean;
  disablePast?: boolean;
  sx?: SxProps;
  diary?: IDays[];
  onMonthChange?: (x: Date) => void;
  loading?: boolean;
  onChange?: (value: Date | null, context: PickerChangeHandlerContext<DateValidationError>) => void;
};
interface Classes {
  [date: string]: string;
}

export interface IDays {
  timeZone: string;
  status: string;
  date: string;
}

const getDayClasses = (days: IDays[]) => {
  const classes: Classes = {};
  days.forEach((day) => {
    const date = dayjs(day.date).format('YYYY-MM-DD');
    switch (day.status) {
      case 'Unavailable':
        classes[date] = 'day-unavailable';
        break;
      case 'NonWorking':
        classes[date] = 'day-nonworking';
        break;
      case 'Available':
        classes[date] = 'day-available';
        break;
      case 'Occupied':
        classes[date] = 'day-occupied';
        break;
      case 'SELECTED':
        classes[date] = 'day-selected';
        break;
      default:
        break;
    }
  });
  return classes;
};

const RHFStaticDatePicker = ({
  name,
  helperText,
  label,
  format,
  disableFuture,
  disablePast,
  highlightRed,
  fullWidth,
  maxDate,
  minDate,
  size = 'small',
  sx,
  diary,
  ...other
}: Props) => {
  const theme = useTheme();
  const { control, watch } = useFormContext();
  const dayClasses = (diary && diary.length > 0 && getDayClasses(diary)) || {};

  const renderDay = (pickersDayProps) => {
    const dateString = dayjs(pickersDayProps.day).format('YYYY-MM-DD');
    const className = dayClasses[dateString] || '';
    const isPast = dayjs(pickersDayProps.day).isBefore(dayjs());

    if (isPast) return <PickersDay {...pickersDayProps} />;
    if (className === 'day-nonworking')
      return (
        <Tooltip title="Non-working Day" arrow placement="top">
          <span>
            <PickersDay {...pickersDayProps} className={className} disabled />
          </span>
        </Tooltip>
      );
    if (className === 'day-selected') {
      return (
        <Tooltip title="Selected" arrow placement="top">
          <span>
            <PickersDay {...pickersDayProps} className={className} disabled selected />
          </span>
        </Tooltip>
      );
    }
    if (className === 'day-unavailable') {
      return (
        <Tooltip title="Unavailable Day" arrow placement="top">
          <span>
            <PickersDay {...pickersDayProps} className={className} disabled sx={{ bgcolor: alpha(theme.palette.grey[500], 0.08) }} />
          </span>
        </Tooltip>
      );
    }

    if (className === 'day-occupied') {
      return (
        <Tooltip title="Occupied" arrow placement="top">
          <span>
            <PickersDay {...pickersDayProps} className={className} disabled />
          </span>
        </Tooltip>
      );
    }
    return <PickersDay {...pickersDayProps} className={className} />;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          onChange={onChange}
          value={watch(name) ? dayjs(watch(name)) : null}
          maxDate={maxDate ? dayjs(maxDate).toDate() : undefined}
          minDate={minDate ? dayjs(minDate).toDate() : undefined}
          disableFuture={disableFuture}
          disablePast={disablePast}
          sx={{
            ...sx,
            '& .MuiPickersDay-day': {
              padding: size ? '8px' : '16px',
            },
          }}
          slots={{
            day: renderDay,
          }}
          {...other}
        />
      )}
    />
  );
};

export default RHFStaticDatePicker;
