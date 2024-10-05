import { Box, Button, IconButton, InputAdornment, Stack, Typography } from "@mui/material"
import { FormProvider, Iconify, RHFTextField, useBoolean } from "@verisure-core";
import { InferType } from "yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { loginDefaultValues, loginSchema } from "./form-helpers";

const LoginPage = () => {

  const navigate = useNavigate();
  const password = useBoolean();

  type loginSchemaType = InferType<typeof loginSchema>;

  const methods = useForm<loginSchemaType>({
    defaultValues: loginDefaultValues,
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
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

        <Button variant="text" color="primary" sx={{ alignSelf: 'flex-end' }} onClick={() => navigate('/auth/forgot-password')}>
          Forgot Password?
        </Button>

        <Button fullWidth color="primary" size="large" type="submit" variant="contained">
          {'Login'}
        </Button>
        <Box display="flex" alignItems="center">
          <Typography variant="body1">Don’t have an account?</Typography>
          <Button variant="text" color="primary" onClick={() => navigate('/signup')}>
            Register Account
          </Button>
        </Box>
      </Stack>
    </FormProvider>
      
  )
}

export default LoginPage;
