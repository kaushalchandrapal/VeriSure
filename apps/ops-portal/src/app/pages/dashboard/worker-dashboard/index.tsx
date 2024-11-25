import { Card, Chip, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useMutation } from "@tanstack/react-query"
import { CustomBreadcrumbs, Iconify, LoadingScreen, TableHeadCustom } from "@verisure-core";
import { IAssignedCase, IUserDetailsResponse, UserService } from "@verisure-services";
import { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouterLinks } from "../../../app-route-paths";

const WorkerDashboardMain = () => {

  const navigate = useNavigate();

  const [assignedCases, setAssignedCases] = useState<IAssignedCase[]>([]);
  
  const getUserDetailsApiCall = useMutation({
    mutationFn: () => UserService().getUserDetails(),

    onSuccess: (rowResponse: AxiosResponse<IUserDetailsResponse>) => {

      const { data: response } = rowResponse;

      setAssignedCases(response.user.assigned_cases);
    }
  });

  useEffect(() => {
    getUserDetailsApiCall.mutateAsync();
  }, []);

  const KycRequestsHead = [
    { label: 'Status', minWidth: 100 },
    { label: 'Date of KYC Request', minWidth: 200 },
    { label: 'Date of Request Updated', minWidth: 200 },
    { label: 'Document Submitted', minWidth: 200 },
    { label: '', width: 10 },
  ];

  return (
    <Stack spacing={2} marginTop={2} marginBottom={20}>
      <CustomBreadcrumbs
        sx={{ width: 1 }}
        heading="Assigned Cases"
        links={[
          {
            name: 'Cases',
            icon: <Iconify icon="solar:case-outline" />,
          },
          {
            name: 'Assigned Cases',
          },
        ]}
      />
      {getUserDetailsApiCall.isPending ? (
        <Stack height='70vh'>
          <LoadingScreen />
        </Stack>
      ) : (
        <Card>
          <TableContainer component={Paper}>
            <Table>
              <TableHeadCustom headLabel={KycRequestsHead} />
              <TableBody>
                {assignedCases.map((assignedCase) => (
                  <TableRow key={assignedCase._id}>
                    <TableCell>
                      <Chip
                        size="small"
                        label={assignedCase.status}
                        variant="soft"
                        color={
                          assignedCase.status === "Pending"
                            ? "warning"
                            : assignedCase.status === "Completed"
                            ? "success"
                            : assignedCase.status === "Rejected"
                            ? "error"
                            : "info"
                        }
                      />
                    </TableCell>

                    <TableCell>
                      {dayjs(new Date(assignedCase.created_at)).format('DD MMMM YYYY')}
                    </TableCell>

                    <TableCell>
                      {dayjs(new Date(assignedCase.updated_at)).format('DD MMMM YYYY')}
                    </TableCell>

                    <TableCell>
                      {assignedCase.documents[0].type === 'driving_license' ? 'Driving License' : 'Passport'}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => navigate(RouterLinks.viewCase, { state: { assignedCase } })}>
                        <Iconify icon='ooui:next-ltr' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </Stack>
  )
}

export default WorkerDashboardMain