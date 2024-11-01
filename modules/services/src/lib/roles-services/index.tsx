import { HttpClient } from '@verisure-core';
import { ROLES_SERVICE } from '../services-path';
import { APIResponse } from '../auth-services';

export interface IRole {
	_id: string;
	name: string;
	permissions: string[];
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export const RolesService = () => {
  return {
    getAllRoles: (): APIResponse<IRole[]> => HttpClient.get(`${ROLES_SERVICE}/roles`),
  };
};
  