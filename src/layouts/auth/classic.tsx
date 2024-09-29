import Box from '@mui/material/Box';

import Main from './main';
import NavVertical from './nav-vertical';
import { useBoolean } from 'src/hooks/use-boolean';
import LoginTopIllustration from 'src/assets/illustrations/top-illustration';
import LoginBottomIllustration from 'src/assets/illustrations/bottom-illustration';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function LoginLayout({ children }: Props) {
  const nav = useBoolean();

  const renderNavVertical = <NavVertical openNav={nav.value} />;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: '313.997px',
          top: -10,
          zIndex: 1000,
        }}
      >
        <LoginTopIllustration />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          left: '114.001px',
          bottom: -20,
          zIndex: 1000,
          transform: 'translateY(20px)',
        }}
      >
        <LoginBottomIllustration />
      </Box>
      {renderNavVertical}
      <Main>{children}</Main>
    </Box>
  );
}
