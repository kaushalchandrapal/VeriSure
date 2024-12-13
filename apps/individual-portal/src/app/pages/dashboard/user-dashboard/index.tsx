import { Card, Chip, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow, useTheme } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { CustomBreadcrumbs, Iconify, LoadingScreen, Scrollbar, TableHeadCustom, TablePaginationCustom, useTable } from "@verisure-core";
import AppWidget from "../common/app-widget";
import { useMutation } from "@tanstack/react-query";
import { IKycStatusCounts, KYCService } from "@verisure-services";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import AppPie from "../common/app-pie";
import dayjs from "dayjs";

const UserDashboard = () => {
  const table = useTable({
    defaultCurrentPage: 0,
    defaultRowsPerPage: 5,
  });
  const theme = useTheme();

  const [counts, setCounts] = useState<IKycStatusCounts>({
    counts: {
      Pending: 0,
      Completed: 0,
      InProgress: 0,
      Rejected: 0,
      total: 0,
    },
    allKYCRequests: []
  });

  const getKycCountsApiCall = useMutation({
    mutationFn: () => KYCService().getKycCounts(),

    onSuccess: (response: AxiosResponse<IKycStatusCounts>) => {
      setCounts(response.data);
    }
  });

  useEffect(() => {
    getKycCountsApiCall.mutateAsync();    
  }, []);

  const KYCRequestsHead = [
    { label: "Requested On", minWidth: 150 },
    { label: "Status", minWidth: 100 },
  ];
  
  const calculatePercentage = (count: number, total: number) => total ? Math.round((count / total) * 100) : 0;

  const paginatedKYCRequests = counts?.allKYCRequests?.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );  

  return (
    <>
      {getKycCountsApiCall?.isPending ? (
        <Stack height='80vh'>
          <LoadingScreen />
        </Stack>
      ) : (
        <>
        
          <CustomBreadcrumbs
            heading="Dashboard"
            links={[
              {
                name: 'Dashboard',
                icon: <Iconify icon="ic:baseline-dashboard" />,
              },
              {
                name: 'User Dashboard',
              },
            ]}
            sx={{
              mb: { xs: 3, md: 5 },
            }}
          />
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 3 }}>
              <AppWidget
                title="Completed"
                total={counts.counts?.total || 0}
                displayTotal={counts.counts?.Completed || 0}
                icon="icon-park-solid:success"
                color="success"
                chart={{
                  series: calculatePercentage(counts.counts?.Completed || 0, counts.counts.total || 0),
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <AppWidget
                title="Rejected"
                total={counts.counts?.total || 0}
                displayTotal={counts.counts?.Rejected || 0}
                icon="subway:error"
                color="error"
                chart={{
                  series: calculatePercentage(counts.counts.Rejected, counts.counts.total),
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <AppWidget
                title="In Progress"
                total={counts.counts?.total || 0}
                displayTotal={counts.counts?.InProgress || 0}
                icon="entypo:progress-two"
                color="info"
                chart={{
                  series: calculatePercentage(counts.counts.InProgress, counts.counts.total),
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <AppWidget
                title="Pending"
                total={counts.counts?.total || 0}
                displayTotal={counts.counts?.Pending || 0}
                icon="material-symbols-light:pending-actions-sharp"
                color="warning"
                chart={{
                  series: calculatePercentage(counts.counts.Pending, counts.counts.total),
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3} marginTop={3}>
            <Grid size={{ xs: 12, md: 5 }}>
              <AppPie
                title="Kyc Requests Overview"
                chart={{
                  colors: [theme.palette.success.dark, theme.palette.error.dark, theme.palette.info.dark, theme.palette.warning.dark],
                  series: [
                    { label: 'Completed', value: counts.counts.Completed },
                    { label: 'Rejected', value: counts.counts.Rejected },
                    { label: 'In Progress', value: counts.counts.InProgress },
                    { label: 'Pending', value: counts.counts.Pending },
                  ],
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Card sx={{ height: 472 }}>

                <TableContainer component={Paper} variant="outlined"  >
                  <Scrollbar
                    sx={{
                      '.simplebar-placeholder': {
                        display: 'none',
                      },
                    }}
                  >

                    <Table>
                      <TableHeadCustom headLabel={KYCRequestsHead} />
                      <TableBody>
                        {paginatedKYCRequests.map((request) => (
                          <TableRow key={request._id}>
                            <TableCell>
                              {dayjs(request.created_at).format("DD MMMM YYYY, hh:mm A")}
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={request.status}
                                variant="soft"
                                color={
                                  request.status === "Pending"
                                    ? "warning"
                                    : request.status === "Completed"
                                    ? "success"
                                    : request.status === "Rejected"
                                    ? "error"
                                    : "info"
                                }
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Scrollbar>
                </TableContainer>
                <TablePaginationCustom
                  count={counts?.allKYCRequests.length}
                  page={table.page}
                  rowsPerPage={table.rowsPerPage}
                  onPageChange={table.onChangePage}
                  onRowsPerPageChange={table.onChangeRowsPerPage}
                  rowsPerPageOptions={[5]}
                />
              </Card>
            </Grid>
          </Grid>
        </>   
      )}
    </>
  )
}

export default UserDashboard