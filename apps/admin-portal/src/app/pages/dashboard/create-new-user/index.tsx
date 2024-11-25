import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Card, CardContent, IconButton, InputAdornment, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useMutation } from '@tanstack/react-query'
import { CustomBreadcrumbs, enqueueSnackbar, FormProvider, Iconify, LoadingScreen, RHFAutocomplete, RHFDatePicker, RHFTextField, useBoolean } from '@verisure-core';
import { AuthService, ICreateUserFromAdminPayload, IRole, IUserCreationResponse, RolesService } from '@verisure-services';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createNewUserDefaultValues, createNewUserSchema } from './form-helper';
import { InferType } from 'yup';

const CreateNewUserPage = () => {

  const navigate = useNavigate();
  const password = useBoolean();
  const verifyPassword = useBoolean();

  const [roles, setRoles] = useState<IRole[]>([]);

  const getAllRolesApiCall = useMutation({
    mutationFn: () => RolesService().getAllRoles(),
    onSuccess: (response: AxiosResponse<IRole[]>) => {
      setRoles(response.data);
    }
  });

  useEffect(() => {
    getAllRolesApiCall.mutateAsync();
  }, []);

  type createNewUserSchemaType = InferType<typeof createNewUserSchema>;

  const methods = useForm<createNewUserSchemaType>({
    resolver: yupResolver(createNewUserSchema),
    defaultValues: createNewUserDefaultValues,
  });

  const createUserFromAdminApiCall = useMutation({
    mutationFn: (payload: ICreateUserFromAdminPayload) => AuthService().createUserFromAdmin(payload),

    onSuccess: (response: AxiosResponse<IUserCreationResponse>) => {
      if (response.data.message) {
        enqueueSnackbar(response.data.message, { variant: 'success' })
      } else {
        enqueueSnackbar("User created successfully", { variant: 'success' })
      }

      navigate('/dashboard');
    }
  });

  const onSubmit = (formValues: createNewUserSchemaType) => {
    createUserFromAdminApiCall.mutateAsync(formValues);
  }

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      {getAllRolesApiCall.isPending ? (
        <Stack height='80vh'>
          <LoadingScreen />
        </Stack>
      ) : (
        <Stack marginTop={2} spacing={2}>

          <CustomBreadcrumbs
            sx={{ width: 1 }}
            heading="Create User"
            links={[
              {
                name: 'User Management',
                href: '/dashboard',
                icon: <Iconify icon="fluent-mdl2:workforce-management" />,
              },
              { name: 'Create User', icon: <Iconify icon="eva:cube-outline" /> },
            ]}
          />
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <RHFTextField name="firstName" label="First Name" placeholder="First Name" />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <RHFTextField name="lastName" label="Last Name" placeholder="Last Name" />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <RHFTextField name="address" label="Address" placeholder="Address" />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <RHFDatePicker fullWidth size='medium' name="birthdate" label="Date of Birth" />
                </Grid>
                <Grid size={{ xs: 12, md: 12 }}>
                  <RHFTextField name="username" label="Username" placeholder="Username" />
                </Grid>
                <Grid size={{ xs: 12, md: 12 }}>
                  <RHFTextField name="email" label="Email" placeholder="Email" />
                </Grid>
                <Grid size={{ xs: 12, md: 12 }}>
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
                </Grid>
                <Grid size={{ xs: 12, md: 12 }}>
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
                </Grid>
                <Grid size={{ xs: 12, md: 12 }}>
                  <RHFAutocomplete
                    name='role'
                    options={roles?.length > 0 ? roles?.map(x => x.name) : []}
                    label="Role"
                    placeholder="Role"
                  />
                </Grid>
              </Grid>
              <Stack spacing={2} marginTop={2}>
                <Stack
                  flexDirection="row"
                  justifyContent="end"
                >
                  <LoadingButton
                    variant='contained'
                    color='primary'
                    type='submit'
                  >
                    Create User
                  </LoadingButton>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      )}
    </FormProvider>
  )
}

export default CreateNewUserPage