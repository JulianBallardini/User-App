export interface User {
  id?: number;
  name: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}

export interface CreateUserRequest {
  name: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
}

export interface UpdateUserRequest {
  id: number;
  name?: string;
  lastname?: string;
  email?: string;
  username?: string;
}
