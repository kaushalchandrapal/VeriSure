import Box from '@mui/material/Box';

import Header from './header';
import { usePathname } from '@verisure-core';
import { Container, useTheme } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function MainLayout({ children }: Props) {
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
        <Container>
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;
