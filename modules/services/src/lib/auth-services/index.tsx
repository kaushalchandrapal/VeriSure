import { AxiosResponse } from 'axios';

import { HttpClient } from '@verisure-core';
import { AUTH_SERVICE } from '../services-path';
import { IUser } from '../user-services';

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

export interface SignupPayload {
  email: string;
  password: string;
  username: string;
};

export interface ICreateUserFromAdminPayload extends SignupPayload {
  role: string;
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

export interface IUserCreationResponse {
  message: string;
  user: IUser;
}


export const AuthService = () => {
  return {
    registerAccount: (payload: SignupPayload): APIResponse<{}> => HttpClient.post(`${AUTH_SERVICE}/signup`, payload),

    accountLogin: (payload: LoginPayload): APIResponse<ILoginResponse> => HttpClient.post(`${AUTH_SERVICE}/login`, payload),

    createUserFromAdmin: (payload: ICreateUserFromAdminPayload): APIResponse<IUserCreationResponse> => HttpClient.post(`${AUTH_SERVICE}/create-new-user`, payload),
  };
};
  