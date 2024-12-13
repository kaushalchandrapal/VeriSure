import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TablePagination,
  Card,
  Stack,
  Chip,
  IconButton
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { CustomBreadcrumbs, enqueueSnackbar, Iconify, LoadingScreen, TableHeadCustom } from '@verisure-core';
import { ICreateKycRequest, IGetKYCRequestsResponse, IGetUserKycRequestsPayload, IKYCRequestCreationResponse, IPdfResponse, KYCService } from '@verisure-services';
import dayjs from 'dayjs';
import { AxiosError, AxiosResponse } from 'axios';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { RouterLinks } from '../../../app-route-paths';

const KycRequestHead = [
  { label: 'Status', minWidth: 100 },
  { label: 'Expires On', minWidth: 250 },
  { label: 'Requested Date', minWidth: 250 },
  { label: 'Date Updated', minWidth: 250 },
  { label: '', minWidth: 10 },
];

const MyKycPage = () => {

  const navigate = useNavigate();

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
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };

  const handleNewKycRequest = () => {
    navigate(RouterLinks.requestNewKyc);
  };

  const downloadKycReportApiCall = useMutation({
    mutationFn: (payload: string) => KYCService().downloadKycReport(payload),

    onSuccess: (rawResponse: AxiosResponse<IPdfResponse>) => {
      const { data: response } = rawResponse;
      console.log(rawResponse);
      window.open(response.data.pdfUrl, '_blank', 'noopener,noreferrer');
    },

    onError: (error: AxiosError<{ message: string }>) => {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
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
            heading="Request Overview"
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
              startIcon={<Iconify icon="carbon:request-quote" />}
              disabled={getUserKycRequestsApiCall.isPending}
              onClick={() => handleNewKycRequest()}
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
                        {dayjs(request?.valid_until ?? null).isValid() ? dayjs(request.valid_until).format('DD MMMM YYYY, hh:mm A') : '--'}
                      </TableCell>
                      <TableCell>
                        {dayjs(request.created_at).format('DD MMMM YYYY, hh:mm A')}
                      </TableCell>
                      <TableCell>
                        {dayjs(request.updated_at).format('DD MMMM YYYY, hh:mm A')}
                      </TableCell>
                      <TableCell>
                        {(request.status === 'Completed' || request.status === 'Rejected') && (
                          <IconButton onClick={() => downloadKycReportApiCall.mutateAsync(request._id)}>
                            <Iconify width={24} icon='heroicons-solid:document-download' />
                          </IconButton>
                        )}
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
