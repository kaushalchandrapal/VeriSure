import { AxiosResponse } from 'axios';

import { HttpClient } from '@verisure-core';
import { USER_SERVICE } from '../services-path';
import { APIResponse } from '../auth-services';
import { IPagination } from '../common';

export interface IUser {
	_id: string;
	email: string;
	username: string;
	email_verified: boolean;
	role: 'Worker' | 'Supervisor';
	createdAt: string;
	updatedAt: string;
	__v: number;
	permissions: string[];
}

export interface IWorkersAndSupervisorsResponse {
	workersAndSupervisors: IUser[];
  totalUsers: number,
  totalPages: number,
  currentPage: number,
  hasNextPage: boolean,
  hasPrevPage: boolean,
}



export const UserService = () => {
  return {
    getWorkersAndSupervisors: (payload: IPagination): APIResponse<IWorkersAndSupervisorsResponse> => HttpClient.post(`${USER_SERVICE}/workers-supervisors`, payload),
  };
};
  