import { Stack, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { m } from 'framer-motion';
import { useLottie } from 'lottie-react';
import { useNavigate } from 'react-router';

import { MotionContainer, varBounce } from '@verisure-core';
import Animation500 from '../lottie/500.json';

// ----------------------------------------------------------------------

export function Page500() {
  const navigate = useNavigate();
  const theme = useTheme();

  const options = {
    animationData: Animation500,
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
            <Typography variant="h1" color={theme.palette.grey[600]} sx={{ marginTop: -9 }}>
              500
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography variant="h6" color={theme.palette.grey[900]} sx={{ mt: 2.5 }}>
              Oops! Something went wrong.
            </Typography>
          </m.div>
          <m.div variants={varBounce().in}>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              We're experiencing an internal server issue. Our team is working on it. Please try again later.{' '}
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
