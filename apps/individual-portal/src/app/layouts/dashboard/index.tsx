import Box from '@mui/material/Box';

import Header from './header';
import { usePathname, useSettingsContext } from '@verisure-core';
import { Container, useTheme } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function DashboardLayout({ children }: Props) {
  const settings = useSettingsContext();
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...({
            pt: { xs: 8, md: 10 },
            bgcolor: theme.palette.background.neutral,
          }),
        }}
      >
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
