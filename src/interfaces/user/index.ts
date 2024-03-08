export interface IUserRequest {
  username: string;
  email: string;
  password: string;
  cpf: string;
}

export interface ISessionRequest {
  email: string;
  password: string;
}

export interface IUserUpdate {
  username?: string;
  email?: string;
  password?: string;
  cpf?: string;
}
