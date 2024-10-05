import Box from '@mui/material/Box';

import Header from './header';
import { usePathname } from '@verisure-core';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function MainLayout({ children }: Props) {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ...({
            pt: { xs: 8, md: 10 },
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
