import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { Box, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'demo@minimals.cc',
    password: 'demo1234',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login?.(data.email, data.password);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });


  return (
    <>
      <Typography variant="h3">Login to your account</Typography>
      <Typography variant="body1" color={theme.palette.text.disabled}>
        Please login using your username and password
      </Typography>
      <FormProvider methods={methods}>
        <Stack spacing={5} marginTop={5}>
          <RHFTextField name="userNameOrEmail" label="Username / Email" />

          <RHFTextField
            name="password"
            label="Password"
            type={password.value ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button variant="text" color="primary" sx={{ alignSelf: 'flex-end' }} onClick={() => navigate('/auth/forgot-password')}>
            Forgot password?
          </Button>

          <Button fullWidth color="primary" size="large" type="submit" variant="contained">
            {'Login'}
          </Button>
          <Box display="flex" alignItems="center">
            <Typography variant="body1">Don’t have an account?</Typography>
            <Button variant="text" color="primary" onClick={() => navigate('/signup')}>
              Register account
            </Button>
          </Box>
        </Stack>
      </FormProvider>
    </>
  );
}
