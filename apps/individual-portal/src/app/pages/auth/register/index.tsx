import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar, FormProvider, Iconify, RHFTextField, useBoolean } from '@verisure-core'
import React from 'react'
import { useForm } from 'react-hook-form';
import { registerDefaultValues, registerSchema } from './form-helper';
import { InferType } from 'yup';
import { Box, Button, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { AuthService, SignupPayload } from '@verisure-services';
import { LoadingButton } from '@mui/lab';

const RegisterPage = () => {
  const navigate = useNavigate();
  const password = useBoolean();
  const verifyPassword = useBoolean();

  type registerSchemaType = InferType<typeof registerSchema>;

  const methods = useForm<registerSchemaType>({
    defaultValues: registerDefaultValues,
    resolver: yupResolver(registerSchema),
  });

  const registerApiCall = useMutation({
    mutationFn: (payload: SignupPayload) => AuthService().registerAccount(payload),

    onSuccess: (data) => {
      enqueueSnackbar('Registration Successful', { variant: 'success' });

      navigate('/auth/login');
    }
  });

  const onSubmit = (formData: registerSchemaType) => {
    registerApiCall.mutateAsync(formData);
  }

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Stack spacing={5} marginTop={2}>
        <Typography variant="h4">Login to your account</Typography>
        <RHFTextField name="username" label="Username" placeholder="Username" />
        <RHFTextField name="email" label="Email" placeholder="Email" />

        <RHFTextField
          name="password"
          label="Password"
          placeholder="Password"
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

        <RHFTextField
          name="verifyPassword"
          label="Verify Password"
          placeholder="Verify Password"
          type={verifyPassword.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={verifyPassword.onToggle} edge="end">
                  <Iconify icon={verifyPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton loading={registerApiCall.isPending} fullWidth color="primary" size="large" type="submit" variant="contained">
          Register
        </LoadingButton>
        <Box display="flex" alignItems="center">
          <Typography variant="body1">Already have an account?</Typography>
          <Button variant="text" color="primary" onClick={() => navigate('/auth/login')}>
            Login
          </Button>
        </Box>
      </Stack>
    </FormProvider>
  )
}

export default RegisterPage