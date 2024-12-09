export interface IDocument {
  _id: string;
  type: string;
  location: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface IAssignedCase {
  _id: string;
  user_id?: IUserID;
  user: IUserID;
  status: "Rejected" | "Pending" | "In Progress" | "Completed";
  ai_status: "Rejected" | "Pending" | "In Progress" | "Completed";
  documents: IDocument[];
  assigner_id: string;
  worker_id: string;
  valid_until: string | null;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface IUserDetails {
  _id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email_verified: boolean;
  role: string;
  assigned_cases: IAssignedCase[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  permissions: string[];
}

export interface IUserID {
  _id: string;
  email: string;
  password_hash: string;
  username: string;
  email_verified: boolean;
  role: string;
  first_name: string;
  last_name: string;
  birthdate: string;
  address: string;
  assigned_cases: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface IUserDetailsResponse {
  user: IUserDetails;
}

export interface IWorkerResponse {
  workers: IWorker[];
}

export interface IWorker {
  _id: string;
  email: string;
  username: string;
  email_verified: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  assigned_cases?: IAssignedCase[];
  permissions: string[];
}

