import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { m } from 'framer-motion';
import { useNavigate } from 'react-router';
import { Stack, useTheme } from '@mui/material';
import { useLottie } from 'lottie-react';

import { MotionContainer, varBounce } from '@verisure-core';
import Animation404 from '../lottie/404.json';

export function Page404() {
    const navigate = useNavigate();
    const theme = useTheme();
  
    const options = {
      animationData: Animation404,
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
                404
              </Typography>
            </m.div>
  
            <m.div variants={varBounce().in}>
              <Typography variant="h6" color={theme.palette.grey[900]} sx={{ mt: 2.5 }}>
                Page Not Found!
              </Typography>
            </m.div>
            <m.div variants={varBounce().in}>
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                The page you're looking for doesn't exist. It may have been moved or deleted.
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