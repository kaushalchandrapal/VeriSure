import { alpha, Button, Grid, Typography, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { useLocation, useNavigate } from 'react-router-dom';

import { Iconify, Scrollbar, useResponsive } from '@verisure-core';
// import { RegistrationBottomIllustration, RegistrationTopIllustration, ZetaLogo } from '@verisure-core/assets';
import { NAV } from '../config-layout';
import { RegistrationBottomIllustration, RegistrationTopIllustration, VeriSureLogo } from '@verisure-assets';

type Props = {
  openNav: boolean;
};

interface IRegistrationSteps {
  stepIcon: string;
  stepName: string;
  stepActivated: boolean;
  index: number;
}

const registrationSteps = [
  {
    stepName: 'Registration',
    stepCaption: 'Please complete the below sections to register with Zeta.',
    stepIcon: 'ci:edit-pencil-line-02',
    stepPathnames: ['/registration/main/personal-details', '/registration/main/verification', '/registration/main/password-set-up'],
  },
  {
    stepName: 'Verification',
    stepCaption: 'Complete the email or SMS verification Process',
    stepIcon: 'mdi:tick-circle-outline',
    stepPathnames: ['/registration/main/verification', '/registration/main/password-set-up'],
  },
  {
    stepName: 'Username & Password',
    stepCaption: 'Please set up password and you are ready to start using Zeta',
    stepIcon: 'tabler:circle-key',
    stepPathnames: ['/registration/main/password-set-up'],
  },
];

const RegistrationSteps = ({ stepIcon, stepName, stepActivated, index }: IRegistrationSteps) => {
  const theme = useTheme();
  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Grid item>
        <Box display="flex" alignItems="center" height="100%" width="100%">
          <Stack
            sx={{
              background: stepActivated ? theme.palette.primary.main : theme.palette.grey[800],
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 64,
              width: 32,
              height: 32,
              position: 'relative',
              '&:before': {
                content: '""',
                display: index !== 0 ? 'block' : 'none',
                position: 'absolute',
                height: '40px',
                width: '2px',
                top: '-40px',
                left: '15px',
                backgroundColor: alpha(theme.palette.grey[500], 0.12),
              },
            }}
          >
            <Iconify icon={stepIcon} width={18} color={stepActivated ? theme.palette.primary.contrastText : theme.palette.grey[600]} />
          </Stack>
        </Box>
      </Grid>

      <Grid item xs={10} md={10} lg={10} xl={10} pl={0}>
        <Stack justifyContent="center">
          <Typography variant="h6" color={theme.palette.primary.contrastText}>
            {stepName}
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default function NavVertical({ openNav }: Props) {
  const theme = useTheme();
  const navigate = useNavigate();

  const lgUp = useResponsive('up', 'lg');

  const { pathname } = useLocation();

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
          background: `linear-gradient(264deg, #FFF 70.16%, #A6E2EF 95.46%)`,
          height: '100vh',
          width: '100%',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            zIndex: 1000,
          }}
        >
          <RegistrationTopIllustration />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            zIndex: 1000,
          }}
        >
          <RegistrationBottomIllustration />
        </Box>
        <Box
          marginY={5}
          marginTop={0}
          paddingX={8}
          paddingY={7}
          height="calc(100vh)"
          sx={{
            background: theme.palette.grey[900],
            overflowY: 'auto',
            position: 'relative',
          }}
        >
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <VeriSureLogo />
            </Box>

            <Stack marginTop={5}>
              <Typography variant="h4" color="background.default">
                Welcome to VeriSure!
              </Typography>
            </Stack>

            <Box>
              <Typography variant="body2" color="text.disabled">
                We're thrilled to have you join us and trust VeriSure for your identity verification needs.
                Our platform is designed to provide you with a secure, efficient, and seamless KYC experience.
                Whether you're onboarding customers, validating identities, or managing compliance,
                our tools are built to simplify your processes while maintaining the highest standards of security.
                If you have any questions or need assistance, our dedicated support team is here to help every step of the way.
                Welcome aboard, and we look forward to a successful partnership!
              </Typography>
            </Box>
          </Box>

          <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: '40px' }}>
            <Typography variant="body1" color="text.disabled" display="flex" alignItems="center" justifyContent="center">
              Already have an account?
              <Button variant="text" color="primary" onClick={() => navigate('/auth/login')}>
                Login
              </Button>
            </Typography>
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
        width: { lg: NAV.W_VERTICAL_ONBOARDING },
      }}
    >
      {lgUp ? (
        <Stack
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.W_VERTICAL_ONBOARDING,
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openNav}
          PaperProps={{
            sx: {
              width: NAV.W_VERTICAL_ONBOARDING,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
