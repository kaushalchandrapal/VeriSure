import dayjs from 'dayjs';

// date : Date | string | number | null | undefined
export function getFormattedDateString(date: dayjs.ConfigType, formatTemplate = 'DD MMMM YYYY', defaultString = '--'): string {
  const dayjsInstance = dayjs(date);
  if (dayjsInstance.isValid()) {
    return dayjsInstance.format(formatTemplate);
  }

  return defaultString;
}
