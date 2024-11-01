import { HttpClient } from '@verisure-core';
import { KYC_SERVICE } from '../services-path';
import { APIResponse } from '../auth-services';
import { IKYCDetails, IPaginationInfo } from '../common';

export interface ICreateKycRequest {
  status?: string;
  assignerId?: string;
  workerId?: string;
};

export interface IKycCounts {
  Pending: number;
  InProgress: number;
  Completed: number;
  Rejected: number;
  total: number;
}

export interface IAllKycRequests {
  _id: string,
  status: string,
  expires_at: string,
  created_at: string,
};

export interface IKycStatusCounts {
  counts: IKycCounts;
  allKYCRequests: IAllKycRequests[];
}

export interface IGetUserKycRequestsPayload {
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface IGetKYCRequestsResponse {
  kycDetails: IKYCDetails[];
  pagination: IPaginationInfo;
}

export interface IKYCRequestCreationResponse {
  message: string;
  data: IKYCDetails;
}

export const KYCService = () => {
  return {
    createKyc: (payload: ICreateKycRequest): APIResponse<IKYCRequestCreationResponse> => HttpClient.post(`${KYC_SERVICE}/create`, payload),

    getKycCounts: (): APIResponse<IKycStatusCounts> => HttpClient.get(`${KYC_SERVICE}/user-kyc/counts`),

    getUserKycRequests: (payload: IGetUserKycRequestsPayload): APIResponse<IGetKYCRequestsResponse> => HttpClient.post(`${KYC_SERVICE}/user-kyc/requests`, payload),
  };
};
  