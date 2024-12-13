import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, TablePagination, Card, Stack, Button, Chip } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { CustomBreadcrumbs, enqueueSnackbar, Iconify, LoadingScreen, TableHeadCustom } from "@verisure-core";
import { IWorkersAndSupervisorsResponse, UserService } from "@verisure-services";
import { AxiosError, AxiosResponse } from "axios";
import dayjs from "dayjs";
import { IPagination } from "modules/services/src/lib/common";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WorkersAndSupervisorsHead = [
  { label: 'Email', minWidth: 150 },
  { label: 'Username', minWidth: 100 },
  { label: 'Email Verified', minWidth: 100 },
  { label: 'Role', minWidth: 100 },
  { label: 'Created At', minWidth: 250 },
  { label: 'Updated At', minWidth: 250 },
];

const AdminDashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState<IWorkersAndSupervisorsResponse | null>(null);
  const navigate = useNavigate();

  const getWorkersAndSupervisorsApiCall = useMutation({
    mutationFn: (payload: IPagination) => UserService().getWorkersAndSupervisors(payload),
    onSuccess: (response: AxiosResponse<IWorkersAndSupervisorsResponse>) => {
      setData(response.data);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  });

  useEffect(() => {
    getWorkersAndSupervisorsApiCall.mutateAsync({ page: page + 1, limit: rowsPerPage });
  }, [page, rowsPerPage]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    if (data?.hasNextPage && newPage > page) {
      setPage(newPage);
    } else if (data?.hasPrevPage && newPage < page) {
      setPage(newPage);
    }
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {getWorkersAndSupervisorsApiCall.isPending ? (
        <Stack height='80vh'>
          <LoadingScreen />
        </Stack>
      ) : (
        <Stack spacing={2} marginTop={2} marginBottom={20}>

          <CustomBreadcrumbs
            sx={{ width: 1 }}
            heading="User Management"
            links={[
              {
                name: 'User Management',
                icon: <Iconify icon="fluent-mdl2:workforce-management" />,
              },
            ]}
          />
          <Stack flexDirection="row" justifyContent="end">
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-fill" />}
              onClick={() => navigate('/dashboard/create-new-user')}
            >
              Add New User
            </Button>
          </Stack>
          <Card>
            <TableContainer component={Paper}>
              <Table>
                <TableHeadCustom headLabel={WorkersAndSupervisorsHead} />
                <TableBody>
                  {data?.workersAndSupervisors.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.email_verified ? <Typography variant="body2">Yes</Typography> : <Typography variant="body2">No</Typography>}
                          variant="soft"
                          color={user.email_verified ? 'success' : 'error'}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.role}
                          variant="soft"
                          color="info"
                        />
                      </TableCell>
                      <TableCell>{dayjs(user.createdAt).format('DD MMMM YYYY, hh:mm A')}</TableCell>
                      <TableCell>{dayjs(user.updatedAt).format('DD MMMM YYYY, hh:mm A')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box mt={2} display="flex" justifyContent="center">
              <TablePagination
                component="div"
                count={data?.totalUsers || 0}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 20]}
              />
            </Box>
          </Card>
        </Stack>
      )}
    </>
  );
};

export default AdminDashboard;
