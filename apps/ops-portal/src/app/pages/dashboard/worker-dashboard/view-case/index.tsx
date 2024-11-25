import { Card, CardActionArea, CardContent, Stack, Typography, useTheme } from '@mui/material';
import { IAssignedCase, IDocumentValidationResponse, IUpdateKYCRequestPayload, KYCService } from '@verisure-services';
import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import { useLocation, useNavigate } from 'react-router-dom';
import { CustomBreadcrumbs, enqueueSnackbar, Iconify } from '@verisure-core';
import { PieChartLoading } from '@verisure-commons';
import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { RouterLinks } from '../../../../app-route-paths';

const ViewCasePageWorker = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const state = (location.state || {}) as { assignedCase: IAssignedCase };

  console.log(location.state);

  const updateKYCApiCall = useMutation({
    mutationFn: (payload: IUpdateKYCRequestPayload) => KYCService().updateKYC(payload),

    onSuccess: (rawResponse) => {
      console.log(rawResponse.data);
      
    }
  });

  const verifyKycAiApiCall = useMutation({
    mutationFn: (payload: string) => KYCService().verifyKycAi(payload),

    onSuccess: (rawResponse: AxiosResponse<IDocumentValidationResponse>) => {
      const { data: response } = rawResponse;

      if (!response.status) {
        navigate(RouterLinks.workerDashBoard);
        enqueueSnackbar('AI Rejected Document Varification Request', { variant: 'error' })
      } else {
        enqueueSnackbar('AI Approved Document Varification Request', { variant: 'success' })
      }
    }
  });
  
  return (
    <Stack spacing={2} marginTop={2} marginBottom={20}>
      <CustomBreadcrumbs
        sx={{ width: 1 }}
        heading="Assigned Cases"
        links={[
          {
            name: 'Cases',
            icon: <Iconify icon="solar:case-outline" />,
            href: '/dashboard/worker/worker-dashboard',
          },
          {
            name: 'View Case',
          },
        ]}
      />
      <Grid container spacing={2} marginTop={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant='caption'>First Name</Typography>
              <Typography variant='h5'>{state.assignedCase.user_id.first_name}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant='caption'>Last Name</Typography>
              <Typography variant='h5'>{state.assignedCase.user_id.last_name}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant='caption'>Username</Typography>
              <Typography variant='h5'>{state.assignedCase.user_id?.username}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <Card>
            <CardContent>
              <Typography variant='caption'>Email</Typography>
              <Typography variant='h5'>{state.assignedCase.user_id?.email}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Card>
            <CardActionArea onClick={() => verifyKycAiApiCall.mutateAsync(state.assignedCase._id)} disabled={state.assignedCase.ai_status === "Completed" || state.assignedCase.ai_status === "Rejected"}>
              <Stack justifyContent='center' alignItems='center' height={300}>
                {state.assignedCase.ai_status === "Completed" && (
                  <>
                    <Stack justifyContent='center' alignItems='center'>
                      <Stack>
                        <Iconify width={65} icon='hugeicons:id-verified' color={theme.palette.success.main} />
                      </Stack>
                      
                      <Stack marginTop={3}>
                        <Typography variant='h6' color='success'>AI Document Verification Completed Sucessfully</Typography>
                      </Stack>
                    </Stack>
                  </>
                )}
                {state.assignedCase.ai_status === 'Rejected' && (
                  <>
                    <Stack justifyContent='center' alignItems='center'>
                      <Stack>
                        <Iconify width={65} icon='hugeicons:id-not-verified' color={theme.palette.error.main} />
                      </Stack>
                      
                      <Stack marginTop={3}>
                        <Typography variant='h6' color='error'>AI Document Verification Unsucessful</Typography>
                      </Stack>
                    </Stack>
                  </>
                )} 
                {state.assignedCase.ai_status !== "Completed" && state.assignedCase.ai_status !== "Rejected" && (
                  <>
                    {verifyKycAiApiCall.isPending ? (
                      <PieChartLoading />
                    ) : (
                      <Stack justifyContent='center' alignItems='center'>
                        <Stack>
                          <Iconify width={65} icon='ix:ai' />
                        </Stack>
                        
                        <Stack>
                          <Typography variant='h6'>AI Verification</Typography>
                        </Stack>
                        <Stack>
                          <Typography variant='caption' sx={{ fontStyle: 'italic' }}>(Click to Start AI Verification)</Typography>
                        </Stack>
                      </Stack>
                    )}
                  </>
                )}
              </Stack>
            </CardActionArea>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={{ minHeight: 300 }}>
            <CardContent>
              <Stack>
                <Typography variant='h5'>Manual Verification</Typography>
              </Stack>
              <Stack justifyContent='center' alignItems='center' height='100%' marginTop={6}>
                <Typography variant='caption' sx={{ fontStyle: 'italic', textAlign: 'center' }}>(Manual verification will only proceed after AI verification. If the AI approves, the case will move to manual review. If the AI rejects, the request will be marked as rejected.)</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default ViewCasePageWorker