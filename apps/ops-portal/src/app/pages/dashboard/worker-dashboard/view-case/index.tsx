import { Button, Card, CardActionArea, CardContent, Stack, TextField, Typography, useTheme } from '@mui/material';
import { IAssignedCase, IDocumentValidationResponse, IKycDeatilsById, IKycDetail, IUpdateKYCRequestPayload, KYCService } from '@verisure-services';
import Grid from '@mui/material/Grid2';
import { useLocation, useNavigate } from 'react-router-dom';
import { CustomBreadcrumbs, enqueueSnackbar, Iconify, LoadingScreen } from '@verisure-core';
import { AIButton, DocumentRejected, DocumentVerified, PieChartLoading } from '@verisure-commons';
import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { RouterLinks } from '../../../../app-route-paths';
import { useEffect, useState } from 'react';
import SummaryCards from './summary-cards';
import { LoadingButton } from '@mui/lab';

const ViewCasePageWorker = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const [caseDetails, setCaseDetails] = useState<IAssignedCase | null>(null);
  const state = (location.state || {}) as { assignedCase: IAssignedCase };

  const [commentMessage, setCommentMessage] = useState<string | null>(null);

  const getKYCByIDApiCall = useMutation({
    mutationFn: (payload: string) => KYCService().getKYCByID(payload),
    
    onSuccess: (rawResponse: AxiosResponse<IKycDeatilsById>) => {
      const { data: response } = rawResponse;

      setCaseDetails(response.data);
    },

    onError: (error: AxiosError<{ message: string }>) => {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  });

  useEffect(() => {
    if (state.assignedCase._id) {
      getKYCByIDApiCall.mutateAsync(state.assignedCase._id);
    }
  }, []);

  const updateKYCApiCall = useMutation({
    mutationFn: (payload: IUpdateKYCRequestPayload) => KYCService().updateKYC(payload),

    onSuccess: (rawResponse) => {
      console.log(rawResponse.data);

      if (state.assignedCase._id) {
        getKYCByIDApiCall.mutateAsync(state.assignedCase._id);
      }
      
    },

    onError: (error: AxiosError<{ message: string }>) => {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  });

  const manualVerification = (status: string) => {
    const payload: IUpdateKYCRequestPayload = {
      kycId: state.assignedCase._id,
      status,
      message: commentMessage,
    };

    updateKYCApiCall.mutateAsync(payload);
  }

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

      if (state.assignedCase._id) {
        getKYCByIDApiCall.mutateAsync(state.assignedCase._id);
      }
    },

    onError: (error: AxiosError<{ message: string }>) => {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
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

      {getKYCByIDApiCall.isPending ? (
        <Stack height='80vh'>
          <LoadingScreen />
        </Stack>
      ) : (
        <>
          <Grid container spacing={2} marginTop={2}>
            <Grid size={{ xs: 12, md: 3 }}>
              <SummaryCards title={'First Name'} color='success' value={caseDetails?.user.first_name || '--'} icon="openmoji:european-name-badge" />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <SummaryCards title={'Last Name'} color='success' value={caseDetails?.user.last_name || '--'} icon="openmoji:european-name-badge" />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <SummaryCards title={'Username'} color='warning' value={caseDetails?.user.username || '--'} icon="solar:user-bold-duotone" />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <SummaryCards title={'Email'} color='info' value={caseDetails?.user.email || '--'} icon="cib:mail-ru" />
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CardActionArea
                  onClick={() => verifyKycAiApiCall.mutateAsync(caseDetails?._id || '')}
                  disabled={caseDetails?.ai_status === 'Completed' || caseDetails?.ai_status === 'Rejected'}
                  sx={{
                    height: '100%',
                    minHeight: 400,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Stack justifyContent="center" alignItems="center" height="100%" spacing={2}>
                    {caseDetails?.ai_status === 'Completed' && (
                      <Stack justifyContent="center" alignItems="center" spacing={5}>
                        <Stack
                          bgcolor={theme.palette.grey[800]}
                          borderRadius={50}
                          padding={1}
                        >
                          <DocumentVerified />
                        </Stack>
                        <Typography variant="h6" textAlign="center">
                          AI{' '}
                          <Typography
                            variant="h6"
                            color="success"
                            component="span"
                          >
                            Approved
                          </Typography>{' '}
                          Submitted Documents
                        </Typography>
                      </Stack>
                    )}
                    {caseDetails?.ai_status === 'Rejected' && (
                      <Stack justifyContent="center" alignItems="center" spacing={5}>
                        <Stack
                          bgcolor={theme.palette.grey[800]}
                          borderRadius={50}
                          padding={1}
                        >
                          <DocumentRejected />
                        </Stack>
                        <Typography variant="h6" textAlign="center">
                          AI{' '}
                          <Typography
                            variant="h6"
                            color="error"
                            component="span"
                          >
                            Rejected
                          </Typography>{' '}
                          Submitted Documents
                        </Typography>
                      </Stack>
                    )}
                    {caseDetails?.ai_status !== 'Completed' && caseDetails?.ai_status !== 'Rejected' && (
                      verifyKycAiApiCall.isPending ? (
                        <PieChartLoading />
                      ) : (
                        <Stack justifyContent="center" alignItems="center" spacing={3}>
                          <AIButton />
                          <Typography variant="h6" textAlign="center">
                            AI Verification
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ fontStyle: 'italic' }}
                            textAlign="center"
                          >
                            (Click to Start AI Verification)
                          </Typography>
                        </Stack>
                      )
                    )}
                  </Stack>
                </CardActionArea>
              </Card>
            </Grid>


            <Grid size={{ xs: 12, md: 7 }}>
              <Card sx={{ minHeight: 400, height: '100%' }}>
                <CardContent sx={{ height: '100%' }}>
                  <Stack>
                    <Typography variant='h5'>Manual Verification</Typography>
                  </Stack>
                  {(caseDetails?.status === 'Pending' || caseDetails?.status === 'In Progress') && (
                    <>
                      {caseDetails?.ai_status === 'Rejected' && (
                        <Stack justifyContent="center" alignItems="center" height="100%">
                          <Typography variant="body2" color='error' sx={{ fontStyle: 'oblique', textAlign: 'center' }}>
                            (The AI verification has rejected the request. The case is marked as rejected.)
                          </Typography>
                        </Stack>
                      )}
    
                      {caseDetails?.ai_status === 'Pending' && (
                        <Stack justifyContent="center" alignItems="center" height="100%">
                          <Typography variant="body2" color='info' sx={{ fontStyle: 'oblique', textAlign: 'center' }}>
                            (The case is pending AI verification. Please wait for the AI to begin processing.)
                          </Typography>
                        </Stack>
                      )}
    
                      {caseDetails?.ai_status === 'Completed' && (
                        <Stack marginTop={2} spacing={3}>
                          <img
                            src={`https://verisure-project.s3.us-east-2.amazonaws.com/${caseDetails.documents[0].location}`}
                          />

                          <TextField
                            label="Comments"
                            multiline
                            rows={4}
                            fullWidth
                            variant="outlined"
                            placeholder="Enter your comments here..."
                            onChange={(e) => setCommentMessage(e.target.value)}
                            value={commentMessage}
                          />
                          <Stack spacing={2} flexDirection='row' justifyContent='end'>
                            <LoadingButton
                              variant='contained'
                              color='success'
                              onClick={() => manualVerification('Completed')}
                              loading={updateKYCApiCall.isPending}
                              >
                              Approve
                            </LoadingButton>
                            <LoadingButton
                              variant='contained'
                              color='error'
                              onClick={() => manualVerification('Rejected')}
                              loading={updateKYCApiCall.isPending}
                            >
                              Reject
                            </LoadingButton>
                          </Stack>
                        </Stack>
                      )}
                    </>
                  )}

                  {caseDetails?.status === 'Completed' && (
                    <Stack justifyContent="center" alignItems="center" spacing={5}>
                      <Stack
                        bgcolor={theme.palette.grey[800]}
                        borderRadius={50}
                        padding={1}
                      >
                        <DocumentVerified />
                      </Stack>
                      <Typography variant="h6" textAlign="center">
                        Caseworker{' '}
                        <Typography
                          variant="h6"
                          color="success"
                          component="span"
                        >
                          Approved
                        </Typography>{' '}
                        Submitted Documents
                      </Typography>
                    </Stack>
                  )}

                  {caseDetails?.ai_status === 'Completed'  && caseDetails?.status === 'Rejected' && (
                    <Stack justifyContent="center" alignItems="center" spacing={5}>
                      <Stack
                        bgcolor={theme.palette.grey[800]}
                        borderRadius={50}
                        padding={1}
                      >
                        <DocumentRejected />
                      </Stack>
                      <Typography variant="h6" textAlign="center">
                        Caseworker{' '}
                        <Typography
                          variant="h6"
                          color="error"
                          component="span"
                        >
                          Rejected
                        </Typography>{' '}
                        Submitted Documents
                      </Typography>
                    </Stack>
                  )}

                  {caseDetails?.ai_status === 'Rejected' && (
                    <Stack justifyContent="center" alignItems="center" spacing={5}>
                      <Stack
                        bgcolor={theme.palette.grey[800]}
                        borderRadius={50}
                        padding={1}
                      >
                        <DocumentRejected />
                      </Stack>
                      <Typography variant="h6" textAlign="center">
                        AI{' '}
                        <Typography
                          variant="h6"
                          color="error"
                          component="span"
                        >
                          Rejected
                        </Typography>{' '}
                        Submitted Documents
                      </Typography>
                    </Stack>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Stack>
  )
}

export default ViewCasePageWorker