import { m } from 'framer-motion';
import { Stack } from '@mui/material';
import { useLottie } from 'lottie-react';

import { MotionContainer, varBounce } from '@verisure-core';
import DocumentSuccess from '../lottie/document-success.json';

export const DocumentVerified = () => {
  const options = {
    animationData: DocumentSuccess,
    loop: true,
  };

  const { View } = useLottie(options, {height: 200, width: 200});

  return (
    <MotionContainer>
      <Stack display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
        <m.div variants={varBounce().in}>{View}</m.div>
      </Stack>
    </MotionContainer>
  );
};
