import { Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { ReactTyped } from 'react-typed';

import { NAV } from '../config-layout';
import { useResponsive } from 'src/hooks/use-responsive';
import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
};

export default function NavVertical({ openNav }: Props) {
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');
  const strings = [
    `<h1 class="animated-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit <span >Lorem ipsum</span> ?</h1>`,
    `<h1  class="animated-text">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua <span >dolor sit</span> ?</h1>`,
    `<h1  class="animated-text">Ut enim ad minim veniam, quis nostrud exercitation <span >ullamco laboris</span> nisi ut aliquip ex ea commodo consequat.</h1>`,
    `<h1  class="animated-text">Duis aute irure dolor in reprehenderit in voluptate velit esse <span >cillum dolore</span>.</h1>`,
    `<h1  class="animated-text">Excepteur sint occaecat cupidatat non proident <span >sunt in culpa</span>.</h1>`,
  ];

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Box
        sx={{
          background: 'linear-gradient(180deg, #000 0%, #5F3D9E 252.22%)',
          height: '100vh',
          width: '100%',
        }}
      >
        <Box
          marginY={5}
          marginLeft={5}
          paddingY={7}
          borderRadius={2.5}
          height="calc(100vh - 2 * 40px)"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 40,
              left: 40,
            }}
          >
            <Typography variant='h1' color='primary.main'>VeriSure</Typography>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Stack
              sx={{
                padding: '50px',
                '.animated-text': {
                  color: theme.palette.common.white,
                  fontSize: '36px',
                  span: {
                    animation: 'colorChange 0s forwards',
                    '@keyframes colorChange': {
                      from: { color: theme.palette.common.white },
                      to: { color: theme.palette.primary.light },
                    },
                  },
                },
              }}
            >
              <ReactTyped strings={strings} typeSpeed={40} fadeOut loop contentType="html" showCursor={false} />
            </Stack>
          </Box>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        minWidth: { lg: NAV.W_VERTICAL },
      }}
    >
      {lgUp ? (
        <Stack
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.W_VERTICAL,
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openNav}
          PaperProps={{
            sx: {
              width: NAV.W_VERTICAL,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
