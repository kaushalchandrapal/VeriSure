import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  TablePagination,
  Card,
  Stack,
  Chip
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { CustomBreadcrumbs, enqueueSnackbar, Iconify, LoadingScreen, TableHeadCustom } from '@verisure-core';
import { ICreateKycRequest, IGetKYCRequestsResponse, IGetUserKycRequestsPayload, IKYCRequestCreationResponse, KYCService } from '@verisure-services';
import dayjs from 'dayjs';
import { AxiosError, AxiosResponse } from 'axios';
import { LoadingButton } from '@mui/lab';

const KycRequestHead = [
  { label: 'Status', minWidth: 100 },
  { label: 'Expires At', minWidth: 250 },
  { label: 'Created At', minWidth: 250 },
  { label: 'Updated At', minWidth: 250 },
];

const MyKycPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState<IGetKYCRequestsResponse | null>(null);

  const getUserKycRequestsApiCall = useMutation({
    mutationFn: (payload: IGetUserKycRequestsPayload) => KYCService().getUserKycRequests(payload),
    onSuccess: (response: AxiosResponse<IGetKYCRequestsResponse>) => {
      setData(response.data);
    },
  });

  useEffect(() => {
    const payload: IGetUserKycRequestsPayload = {
      page: page + 1,
      limit: rowsPerPage,
      sortBy: 'created_at',
      order: 'desc',
    };
    getUserKycRequestsApiCall.mutateAsync(payload);
  }, [page, rowsPerPage]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    if (data?.pagination.hasNextPage && newPage > page) {
      setPage(newPage);
    } else if (data?.pagination.hasPrevPage && newPage < page) {
      setPage(newPage);
    }
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const createKycApiCall = useMutation({
    mutationFn: (payload: ICreateKycRequest) => KYCService().createKyc(payload),
    
    onSuccess: (response: AxiosResponse<IKYCRequestCreationResponse>) => {
      enqueueSnackbar(response.data.message, { variant: 'success' });

      const payload: IGetUserKycRequestsPayload = {
        page: page + 1,
        limit: rowsPerPage,
        sortBy: 'created_at',
        order: 'asc',
      };
      getUserKycRequestsApiCall.mutateAsync(payload);
    },

    onError: (error: AxiosError<any>) => {
      if (error.status === 400) {
        enqueueSnackbar(error.response?.data?.message, { variant: 'error' });
      }
    }
  });

  return (
    <>
      {getUserKycRequestsApiCall.isPending ? (
        <Stack height="80vh">
          <LoadingScreen />
        </Stack>
      ) : (
        <Stack spacing={2} marginTop={2} marginBottom={20}>
          <CustomBreadcrumbs
            sx={{ width: 1 }}
            heading="My KYC"
            links={[
              {
                name: 'My Kyc',
                icon: <Iconify icon="arcticons:secure-box" />,
              },
              {
                name: 'Request Overview',
              },
            ]}
          />
          <Stack flexDirection="row" justifyContent="end">
            <LoadingButton
              variant="contained"
              color="primary"
              loading={createKycApiCall.isPending}
              startIcon={<Iconify icon="carbon:request-quote" />}
              onClick={() => createKycApiCall.mutateAsync({})}
            >
              Request New KYC 
            </LoadingButton>
          </Stack>
          <Card>
            <TableContainer component={Paper}>
              <Table>
                <TableHeadCustom headLabel={KycRequestHead} />
                <TableBody>
                  {data?.kycDetails.map((request) => (
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
                        {dayjs(request.expires_at).format('DD MMMM YYYY, hh:mm A')}
                      </TableCell>
                      <TableCell>
                        {dayjs(request.created_at).format('DD MMMM YYYY, hh:mm A')}
                      </TableCell>
                      <TableCell>
                        {dayjs(request.updated_at).format('DD MMMM YYYY, hh:mm A')}
                      </TableCell>
                    </TableRow>
                  ))}
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
    </>
  );
};

export default MyKycPage;
