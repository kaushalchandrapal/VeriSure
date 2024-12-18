import { AxiosError, AxiosResponse } from 'axios';
import { Box, Button, IconButton, InputAdornment, Stack, Typography } from "@mui/material"
import { InferType } from "yup";
import { LoadingButton } from "@mui/lab";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { AuthService, ILoginResponse, LoginPayload } from "@verisure-services";
import { enqueueSnackbar, FormProvider, Iconify, RHFTextField, useBoolean } from "@verisure-core";
import { loginDefaultValues, loginSchema } from "./form-helpers";

const LoginPage = () => {

  const navigate = useNavigate();
  const password = useBoolean();

  type loginSchemaType = InferType<typeof loginSchema>;

  const methods = useForm<loginSchemaType>({
    defaultValues: loginDefaultValues,
    resolver: yupResolver(loginSchema),
  });

  const accountLoginApiCall = useMutation({
    mutationFn: (payload: LoginPayload) => AuthService().workerSupervisorAccountLogin(payload),

    onSuccess: (data: AxiosResponse<ILoginResponse>) => {
      if (data.data.token) {
        sessionStorage.setItem("accessToken", data.data.token);

        navigate('/dashboard');
      }
    },

    onError: (error: AxiosError<{ message: string }>) => {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  });

  const onSubmit = (data: loginSchemaType) => {
    const payload = {
      email: data.usernameOrEmail,
      password: data.password,
    };

    accountLoginApiCall.mutateAsync(payload);
  }

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Stack spacing={5} marginTop={2}>
        <Typography variant="h4">Login to your account</Typography>
        <RHFTextField name="usernameOrEmail" label="Username / Email" placeholder="Username / Email" />

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

        {/* <Button variant="text" color="primary" sx={{ alignSelf: 'flex-end' }} onClick={() => navigate('/auth/forgot-password')}>
          Forgot Password?
        </Button> */}

        <LoadingButton loading={accountLoginApiCall.isPending} fullWidth color="primary" size="large" type="submit" variant="contained">
          {'Login'}
        </LoadingButton>
      </Stack>
    </FormProvider>
      
  )
}

export default LoginPage;
