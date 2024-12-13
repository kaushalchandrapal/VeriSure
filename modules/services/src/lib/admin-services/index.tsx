import { AxiosResponse } from 'axios';

import { HttpClient } from '@verisure-core';
import { ADMIN_SERVICE } from '../services-path';
import { APIResponse } from '../auth-services';

export interface UserCounts {
  totalUsers: number;
  Applicant: number;
  Supervisor: number;
  Admin: number;
  Worker: number;
}

export interface KycRequestCounts {
  totalKycRequests: number;
  Pending: number;
  "In Progress": number;
  Completed: number;
  Rejected: number;
}

export interface DataCounts {
  users: UserCounts;
  kycRequests: KycRequestCounts;
}

export interface IAdminCountsApiResponse {
  success: boolean;
  message: string;
  data: DataCounts;
}


export const AdminService = () => {
  return {
    adminCounts: (): APIResponse<IAdminCountsApiResponse> => HttpClient.get(`${ADMIN_SERVICE}/counts`)
  };
};
  