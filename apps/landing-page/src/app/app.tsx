import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { SettingsProvider, useScrollToTop, ThemeProvider, MotionLazy, SnackbarProvider, ProgressBar, SettingsDrawer, useLocales } from "@verisure-core";
import dayjs from 'dayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LandingPage from './landing-page';


const queryClient = new QueryClient();


export default function App() {
  const { currentLang } = useLocales();
  dayjs.locale(currentLang?.value || 'en');

  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={currentLang?.value}>
        <SettingsProvider
          defaultSettings={{
            themeMode: 'light', // 'light' | 'dark'
            themeDirection: 'ltr', //  'rtl' | 'ltr'
            themeContrast: 'default', // 'default' | 'bold'
            themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
            themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            themeStretch: false,
          }}
        >
          <ThemeProvider>
            <MotionLazy>
              <SnackbarProvider>
                <SettingsDrawer />
                <ProgressBar />
                <LandingPage />
              </SnackbarProvider>
            </MotionLazy>
          </ThemeProvider>
        </SettingsProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
}