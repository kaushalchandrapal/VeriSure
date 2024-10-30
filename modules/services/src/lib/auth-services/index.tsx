import { AxiosResponse } from 'axios';

import { HttpClient } from '@verisure-core';
import { AUTH_SERVICE } from '../services-path';

export interface IGenericErrorResponse {
  response?: {
    data?: {
      error?: {
        errorCode?: string;
        errorMessage?: string;
        errorDetails?: string;
        errorType?: string;
      };
    };
  };
}

export interface IEmptyRequestResponse {}

export type APIResponse<T> = Promise<AxiosResponse<T>>;


export type SignupPayload = {
  email: string;
  password: string;
  username: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export interface ILoginResponse {
  isValid: boolean;
  token: string;
  message: string;
}


export const AuthService = () => {
  return {
    registerAccount: (payload: SignupPayload): APIResponse<{}> => HttpClient.post(`${AUTH_SERVICE}/signup`, payload),

    accountLogin: (payload: LoginPayload): APIResponse<ILoginResponse> => HttpClient.post(`${AUTH_SERVICE}/login`, payload),
  };
};
  