import { Autocomplete, Box, Card, Chip, Paper, Stack, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query"
import { CustomBreadcrumbs, enqueueSnackbar, Iconify, jwtDecode, LoadingScreen, TableHeadCustom } from "@verisure-core";
import { IAssignKYCCaseRequestPayload, IAssignKYCCaseResponse, IGetAllKycRequestPayload, IKycDetail, IKycDetailsResponse, IKycDetailsResponseElement, IWorker, IWorkerResponse, KYCService, UserService } from "@verisure-services";
import { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const TableHead = [
  { label: 'Status', minWidth: 100 },
  { label: 'Requested Date', minWidth: 250 },
  { label: 'Case Worker', minWidth: 250 },
  { label: 'Date Updated', minWidth: 250 },
];

const SupervisorDashboardMain = () => {

  const [userDetails] = useState(jwtDecode(sessionStorage.getItem("accessToken")));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState<IKycDetailsResponseElement | null>(null);

  const [allWorkers, setAllWorkers] = useState<IWorker[]>([]);

  const getAllKycAPICall = useMutation({
    mutationFn: (payload: IGetAllKycRequestPayload) => KYCService().getAllKyc(payload),

    onSuccess: (rawResponse: AxiosResponse<IKycDetailsResponse>) => {
      const { data: response } = rawResponse;
      setData(response.data);
    }
  });

  const getAllWorkersApiCall = useMutation({
    mutationFn: () => UserService().getAllWorkers(),

    onSuccess: (rawResponse: AxiosResponse<IWorkerResponse>) => {
      const { data: response } = rawResponse;

      setAllWorkers(response.workers);
    }
  });

  useEffect(() => {
    const payload: IGetAllKycRequestPayload = {
      page: page + 1,
      limit: rowsPerPage,
    };
    getAllKycAPICall.mutateAsync(payload);
  }, [page, rowsPerPage]);

  useEffect(() => {
    getAllWorkersApiCall.mutateAsync();
  }, []);  

  const assignKycCaseApiCall = useMutation({
    mutationFn: (payload: IAssignKYCCaseRequestPayload) => KYCService().assignKycCase(payload),

    onSuccess: (rawResponse: AxiosResponse<IAssignKYCCaseResponse>) => {
      const { data: response } = rawResponse;
      enqueueSnackbar(response.message, { variant: "success" });

      const payload: IGetAllKycRequestPayload = {
        page: page + 1,
        limit: rowsPerPage,
      };
      getAllKycAPICall.mutateAsync(payload);
    }
  });

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    if (data?.pagination.hasNextPage && newPage > page) {
      setPage(newPage);
    } else if (data?.pagination.hasPrevPage && newPage < page) {
      setPage(newPage);
    }
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(event.target.value);
    
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const getCaseWorkerInfo = (request: IKycDetail) => {

    if (!!request.worker_id) {
      const worker = allWorkers.find(x => x._id === request.worker_id);
      return <Typography>{worker?.username}</Typography>
    }

    return (
      <Autocomplete
        options={allWorkers}
        getOptionLabel={(x) => x.username}
        fullWidth
        size="small"
        onChange={(e, newWorker) => {
          console.log(newWorker);
          
          const payload: IAssignKYCCaseRequestPayload = {
            kycId: request._id,
            workerId: newWorker?._id ?? "",
          }

          assignKycCaseApiCall.mutateAsync(payload);

        }}
        renderInput={(params) => (
          <TextField {...params} placeholder="Assign worker" variant="outlined" />
        )}
      />
    );
  }

  return (
    <Stack spacing={2} marginTop={2} marginBottom={20}>
      <CustomBreadcrumbs
         sx={{ width: 1 }}
         heading="Case List"
         links={[
           {
             name: 'Supervisor Dashboard',
             icon: <Iconify icon="material-symbols:supervisor-account" />,
           },
           {
             name: 'Case List',
           },
         ]}
      />
      <Stack marginTop={3}>
        <Typography variant="h4">
          Hello, <Typography variant="h3" component="span" color="primary">{userDetails?.username}</Typography>
        </Typography>
      </Stack>

      {getAllKycAPICall.isPending || getAllWorkersApiCall.isPending ? (
        <Stack height="80vh">
          <LoadingScreen />
        </Stack>
      ) : (
        <Stack>
          <Card>
            <TableContainer component={Paper}>
              <Table>
                <TableHeadCustom headLabel={TableHead} />
                <TableBody>
                  {data?.kycDetails.map(request => {
                    return (
                      <TableRow key={request._id}>
                        <TableCell>
                          <Chip
                            label={request.status}
                            variant="soft"
                            color={
                              request.status === 'Pending'
                                ? 'warning'
                                : request.status === 'Completed'
                                ? 'success'
                                : request.status === 'Rejected'
                                ? 'error'
                                : 'info'
                            }
                          />
                        </TableCell>
                        <TableCell>
                          {dayjs(request.created_at).format('DD MMMM YYYY, hh:mm A')}
                        </TableCell>
                        <TableCell>
                          {getCaseWorkerInfo(request)}
                        </TableCell>
                        <TableCell>
                          {dayjs(request.updated_at).format('DD MMMM YYYY, hh:mm A')}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box mt={2} display="flex" justifyContent="center">
              <TablePagination
                component="div"
                count={data?.pagination.total || 0}
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
    </Stack>
  )
}

export default SupervisorDashboardMain