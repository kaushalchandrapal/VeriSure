import { IAssignedCase, IUserID } from "../user-services/types";

export interface IKycDetailsResponseElement {
  kycDetails: IKycDetail[];
  pagination: IPagination;
}

export interface IKycDetailsResponse {
  data: IKycDetailsResponseElement;
}

export interface IKycDetail {
  _id: string;
  user_id: IUserID;
  status: "Rejected" | "Pending" | "In Progress" | "Completed";
  ai_status: "Rejected" | "Pending" | "In Progress" | "Completed";
  documents: string[];
  assigner_id: string | null;
  worker_id: string | null;
  valid_until: string | null;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface IKycDeatilsById {
  data: IAssignedCase;
}

export interface IPagination {
  total: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IGetAllKycRequestPayload {
  page: number;
  limit: number;
}

export interface IAssignKYCCaseRequestPayload {
  kycId: string;
  workerId: string;
}

export interface IAssignKYCCaseResponse {
  message: string;
}


export interface IPdfMeta {
  name: string;
  display_name: string;
  encoding: string;
  contentType: string;
  publicId: string;
}

export interface IPdfData {
  pdfUrl: string;
  meta: IPdfMeta;
}

export interface IPdfResponse {
  data: IPdfData;
}
