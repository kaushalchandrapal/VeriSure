export interface IPagination {
  page: number,
  limit: number,
};

export interface IPaginationInfo {
  total: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IKYCDetails {
  valid_until: string | null;
  _id: string;
  user_id: string;
  status: 'Pending' | 'Completed' | 'In Progress' | 'Rejected';
  assigner_id: string | null;
  worker_id: string | null;
  expires_at: string;
  created_at: string;
  updated_at: string;
  __v: number;
}