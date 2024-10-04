'use client';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { useLocales } from './use-locales';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function LocalizationProvider({ children }: Props) {
  const { currentLang } = useLocales();

  return (
    <MuiLocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={currentLang.adapterLocale}>
      {children}
    </MuiLocalizationProvider>
  );
}
