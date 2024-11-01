import { Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { ReactTyped } from 'react-typed';

import { useResponsive, Scrollbar } from '@verisure-core';
import { NAV } from '../config-layout';
import { VeriSureLogo } from '@verisure-assets';

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
};

export default function NavVertical({ openNav }: Props) {
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');
  const strings = [
    `<h1 class="animated-text">Empowering Businesses with <span>Secure</span> and <span>Seamless KYC Solutions</span> – VeriSure is your partner in <span>digital identity verification</span>.</h1>`,
    `<h1 class="animated-text">Experience the <span>Future of KYC</span> with VeriSure – <span>Security</span>, <span>Compliance</span>, and <span>Simplicity</span> in One Powerful Platform.</h1>`,
    `<h1 class="animated-text">VeriSure: <span>Redefining KYC</span> with <span>AI-Driven Technology</span> for <span>Fast</span>, <span>Reliable</span>, and <span>Trusted Identity Verification</span>.</h1>`,
    `<h1 class="animated-text"><span>Secure</span>. <span>Compliant</span>. <span>Effortless</span>. VeriSure is the <span>KYC Solution</span> Built for Today’s Digital Challenges.</h1>`,
    `<h1 class="animated-text">Transforming KYC for a <span>Safer Digital World</span> – VeriSure Ensures <span>Peace of Mind</span> in Every <span>Identity Check</span>.</h1>`,
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
            <Box sx={{ width: 250 }}>
              <VeriSureLogo />
            </Box>
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
