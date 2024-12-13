import { useMutation } from '@tanstack/react-query'
import { AdminService, IAdminCountsApiResponse } from '@verisure-services';
import { enqueueSnackbar, Iconify, LoadingScreen } from '@verisure-core';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios';
import { Card, CardContent, Stack, Tab, Tabs, useTheme } from '@mui/material';
import Grid from '@mui/material/Grid2'
import ChartDonut from './donut-chart';
import ChartPie from './pie-chart';
import ChartRadialBar from './radial-chart';

const AdminDashboard = () => {
  const theme = useTheme();
  const [adminCounts, setAdminCounts] = useState<IAdminCountsApiResponse | null>(null);
  const [currentTab, setCurrentTab] = useState<string>('USER');

  const userLabels = ["Applicant", "Supervisor", "Admin", "Worker"];
  const userSeries = [
    adminCounts?.data.users.Applicant || 0,
    adminCounts?.data.users.Supervisor || 0,
    adminCounts?.data.users.Admin || 0,
    adminCounts?.data.users.Worker || 0,
  ];

  const kycLabels = ["Completed", "In Progress", "Pending", "Rejected"];
  const kycSeries = [
    adminCounts?.data.kycRequests["Completed"] || 0,
    adminCounts?.data.kycRequests["In Progress"] || 0,
    adminCounts?.data.kycRequests["Pending"] || 0,
    adminCounts?.data.kycRequests["Rejected"] || 0,
  ];  

  const adminCountsApiCall = useMutation({
    mutationFn: () => AdminService().adminCounts(),

    onSuccess: (rawResponse: AxiosResponse<IAdminCountsApiResponse>) => {
      const { data: response } = rawResponse;

      setAdminCounts(response);      
    },

    onError: () => {
      enqueueSnackbar("Something went wrong.", { variant: "error" })
    }
  });
  

  useEffect(() => {
    adminCountsApiCall.mutateAsync();
  }, []);


  const TABS = [
    {
      value: 'USER',
      icon: <Iconify icon="fa6-solid:users" width={24} />,
      label: 'Users Analytics',
    },
    {
      value: 'KYC',
      icon: <Iconify icon="carbon:report-data" width={24} />,
      label: 'KYC Analytics',
    },
  ];

  const handleChangeTab = useCallback((event: SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Stack>
      {adminCountsApiCall.isPending ? (
        <Stack height='80vh'>
          <LoadingScreen />
        </Stack>
      ) : (
        <>
          {adminCounts && (
            <Stack>
              <Tabs value={currentTab} onChange={handleChangeTab} sx={{ marginBottom: 4, marginTop: 4}}>
                {TABS.map((tab) => (
                  <Tab
                    key={tab.value}
                    icon={tab.icon}
                    label={tab.label}
                    value={tab.value}
                  />
                ))}
              </Tabs>
              {currentTab === 'USER' && (
                <Stack>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 4, lg: 4 }}>
                      <Card sx={{ height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <CardContent>
                          <ChartDonut series={userSeries} labels={userLabels} colors={[theme.palette.primary.darker, theme.palette.primary.dark, theme.palette.primary.main, theme.palette.primary.light]} />
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4, lg: 4 }}>
                      <Card sx={{ height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <CardContent>
                          <ChartPie series={userSeries} labels={userLabels} colors={[theme.palette.primary.darker, theme.palette.primary.dark, theme.palette.primary.main, theme.palette.primary.light]} />
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4, lg: 4 }}>
                      <Card sx={{ height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <CardContent>
                          <ChartRadialBar series={userSeries} labels={userLabels} colors={[theme.palette.primary.darker, theme.palette.primary.dark, theme.palette.primary.main, theme.palette.primary.light]} />
                        </CardContent>
                      </Card>
                    </Grid>

                  </Grid>
                </Stack>
              )}

              {currentTab === 'KYC' && (
                <Stack>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 4, lg: 4 }}>
                      <Card sx={{ height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <CardContent>
                          <ChartDonut series={kycSeries} labels={kycLabels} colors={[theme.palette.success.main, theme.palette.info.main, theme.palette.warning.main, theme.palette.error.main]} />
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4, lg: 4 }}>
                      <Card sx={{ height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <CardContent>
                          <ChartPie series={kycSeries} labels={kycLabels} colors={[theme.palette.success.main, theme.palette.info.main, theme.palette.warning.main, theme.palette.error.main]} />
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4, lg: 4 }}>
                      <Card sx={{ height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <CardContent>
                          <ChartRadialBar series={kycSeries} labels={kycLabels} colors={[theme.palette.success.main, theme.palette.info.main, theme.palette.warning.main, theme.palette.error.main]} />
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* <Grid size={{ xs: 12, md: 12, lg: 12 }}>
                      <Card sx={{ height: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <CardContent> 
                          <ChartArea series={createGradualTrendData(adminCounts?.data)} />
                        </CardContent>
                      </Card>
                    </Grid> */}

                  </Grid>
                </Stack>
              )}
            </Stack>
          )}
        </>
      )}
    </Stack>
  )
}

export default AdminDashboard