import { HttpClient } from "@verisure-core";
import { APIResponse } from "../auth-services";
import { AWS_SERVICE } from "../services-path";

export interface IPreSignedUrl {
  fileName: string; 
  url: string;
}

export interface IPreSignedUrlResponse {
  fileName: string;
  url: string;      
}

export interface IPreSignedUrlRequest {
  fileNames: string[];
}

export interface IFileUploadAwsRequestPayload {
  url: string,
  payload: string | File | null,
}

export const AWSService = () => {
  return {
    fileUploadAwsNameGetter: (payload: IPreSignedUrlRequest): APIResponse<IPreSignedUrlResponse[]> => HttpClient.post(`${AWS_SERVICE}/pre-signed-url`, payload),

    fileUploadAws: (payload: IFileUploadAwsRequestPayload) => HttpClient.uploadPut(payload.url, payload.payload),
  };
};
  