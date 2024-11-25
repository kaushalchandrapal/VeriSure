import { HttpClient } from '@verisure-core';
import { KYC_SERVICE } from '../services-path';
import { APIResponse } from '../auth-services';
import { IKYCDetails, IPaginationInfo } from '../common';
import { IAssignKYCCaseRequestPayload, IAssignKYCCaseResponse, IGetAllKycRequestPayload, IKycDetailsResponse } from './types';

export interface ICreateKycRequest {
  documentType: string;
  images: string[];
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

export interface IDocumentValidationResponse {
  status: boolean;
  message: string;
}

export interface IUpdateKYCRequestPayload {
  kycId: string;
  status: string;
}

export const KYCService = () => {
  return {
    createKyc: (payload: ICreateKycRequest): APIResponse<IKYCRequestCreationResponse> => HttpClient.post(`${KYC_SERVICE}/create`, payload),

    getKycCounts: (): APIResponse<IKycStatusCounts> => HttpClient.get(`${KYC_SERVICE}/user-kyc/counts`),

    getUserKycRequests: (payload: IGetUserKycRequestsPayload): APIResponse<IGetKYCRequestsResponse> => HttpClient.post(`${KYC_SERVICE}/user-kyc/requests`, payload),

    getAllKyc: (payload: IGetAllKycRequestPayload): APIResponse<IKycDetailsResponse> => HttpClient.post(`${KYC_SERVICE}/all`, payload),

    verifyKycAi: (payload: string): APIResponse<IDocumentValidationResponse> => HttpClient.post(`${KYC_SERVICE}/verify-ai/${payload}`),

    updateKYC: (payload: IUpdateKYCRequestPayload) => HttpClient.put(`${KYC_SERVICE}/status`, payload),

    assignKycCase: (payload: IAssignKYCCaseRequestPayload): APIResponse<IAssignKYCCaseResponse> => HttpClient.post(`${KYC_SERVICE}/assign`, payload),

  };
};
  