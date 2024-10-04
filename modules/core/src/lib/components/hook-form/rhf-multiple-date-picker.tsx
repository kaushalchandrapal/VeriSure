import { StaticDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import * as React from 'react';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

export default function MultiDatePicker() {
  const [values, setValues] = React.useState(null);

  return (
    <StaticDatePicker
      displayStaticWrapperAs="desktop"
      value={values}
      onChange={(newValue) => {
        const array = (values && [...values]) || [];
        const date = newValue;

        array.push(date);

        setValues(array);
      }}
    />
  );
}
