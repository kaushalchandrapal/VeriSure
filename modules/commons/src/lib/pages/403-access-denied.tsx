import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { m } from 'framer-motion';
import { useNavigate } from 'react-router';
import { Stack, useTheme } from '@mui/material';
import { useLottie } from 'lottie-react';

import { MotionContainer, varBounce } from '@verisure-core';
import Animation403 from '../lottie/403.json';

// ----------------------------------------------------------------------

export function Page403() {
  const navigate = useNavigate();
  const theme = useTheme();

  const options = {
    animationData: Animation403,
    loop: true,
  };

  const { View } = useLottie(options);

  return (
    <MotionContainer>
      <Stack
        sx={{
          width: 416,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Stack>
          <m.div variants={varBounce().in}>{View}</m.div>

          <m.div variants={varBounce().in}>
            <Typography variant="h1" color={theme.palette.grey[600]} sx={{ marginTop: -2 }}>
              403
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography variant="h6" color={theme.palette.grey[900]} sx={{ mt: 2.5 }}>
              Access Denied!
            </Typography>
          </m.div>
          <m.div variants={varBounce().in}>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              You don't have permission to view this page. Contact support at{' '}
              <Typography component="span" color="primary">
                support@example.com
              </Typography>{' '}
              if you need help.
            </Typography>
          </m.div>
        </Stack>
      </Stack>
      <Button size="large" variant="contained" color="primary" sx={{ mt: 2.5 }} onClick={() => navigate('/')}>
        Go Back Home
      </Button>
    </MotionContainer>
  );
}
