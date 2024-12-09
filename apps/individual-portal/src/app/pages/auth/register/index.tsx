import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar, FormProvider, Iconify, RHFDatePicker, RHFTextField, useBoolean, useResponsive } from '@verisure-core';
import { useForm } from 'react-hook-form';
import { registerDefaultValues, registerSchema } from './form-helper';
import { InferType } from 'yup';
import { Accordion, AccordionDetails, AccordionSummary, alpha, Box, Button, IconButton, InputAdornment, Stack, Typography, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { AuthService, SignupPayload } from '@verisure-services';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import dayjs from 'dayjs';

const RegisterPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const password = useBoolean();
  const verifyPassword = useBoolean();
  const lgUp = useResponsive('up', 'lg');

  const [expanded, setExpanded] = useState<string>('personalInfo');

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
    const payload: SignupPayload = {
      ...formData,
      birthdate: dayjs(formData.birthdate).format('YYYY-MM-DD'),
    };
    registerApiCall.mutateAsync(payload);
  }

  const handleChange =
    (panel: string) =>
    (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : panel);
    };

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Stack spacing={{ xs: 2, sm: 2 }} marginTop={2}>
        <Typography variant="h4">Create New Account</Typography>

        <Accordion
          expanded={expanded === "personalInfo"}
          onChange={handleChange("personalInfo")}
          sx={{
            '&.MuiAccordion-root': {
              border: expanded === "personalInfo" ? `1px solid ${alpha(theme.palette.primary.main, 1)}`:  `1px solid ${alpha(theme.palette.text.disabled, 0.5)}`,
              mb: 1,
              borderRadius: 1.5,
            },
            '&.MuiAccordion-root::before': {
              display: 'none',
            },
            '&.Mui-expanded': {
              mb: 1,
              mt: 0,
            },
          }}
        >
          <AccordionSummary expandIcon={<Iconify icon="si:expand-more-fill" />}>
            <Typography variant="h6">Personal Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <RHFTextField size={lgUp ? 'medium' : 'small'} name="firstName" label="First Name" placeholder="First Name" />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <RHFTextField size={lgUp ? 'medium' : 'small'} name="lastName" label="Last Name" placeholder="Last Name" />
              </Grid>
            </Grid>
            <Stack width='100%' marginTop={{ xs: 2, sm: '16px' }} >
              <RHFDatePicker size={lgUp ? 'medium' : 'small'} name="birthdate" label="Date of Birth" />
            </Stack>
            <Stack width='100%' marginTop={{ xs: 2, sm: '16px' }} >
              <RHFTextField size={lgUp ? 'medium' : 'small'} name="address" label="Address" />
            </Stack>

          </AccordionDetails>
        </Accordion>
        
        <Accordion
          expanded={expanded === "accountInfo"}
          onChange={handleChange("accountInfo")}
          sx={{
            '&.MuiAccordion-root': {
              border: expanded === "accountInfo" ? `1px solid ${alpha(theme.palette.primary.main, 1)}`:  `1px solid ${alpha(theme.palette.text.disabled, 0.5)}`,
              mb: 1,
              borderRadius: 1.5,
            },
            '&.MuiAccordion-root::before': {
              display: 'none',
            },
            '&.Mui-expanded': {
              mb: 1,
              mt: 0,
            },
          }}
        >
          <AccordionSummary expandIcon={<Iconify icon="si:expand-more-fill" />}>
            <Typography variant="h6">Account Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <RHFTextField
                size={lgUp ? "medium" : "small"}
                name="username"
                label="Username"
                placeholder="Username"
              />
              <RHFTextField
                size={lgUp ? "medium" : "small"}
                name="email"
                label="Email"
                placeholder="Email"
              />
              <RHFTextField
                name="password"
                label="Password"
                placeholder="Password"
                size={lgUp ? "medium" : "small"}
                type={password.value ? "text" : "password"}
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
                size={lgUp ? "medium" : "small"}
                type={verifyPassword.value ? "text" : "password"}
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
            </Stack>
          </AccordionDetails>
        </Accordion>

        <LoadingButton size={lgUp ? 'medium' : 'small'} loading={registerApiCall.isPending} fullWidth color="primary" type="submit" variant="contained">
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