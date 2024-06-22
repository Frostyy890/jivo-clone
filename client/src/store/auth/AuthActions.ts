export enum Role {
  USER = "user",
  ADMIN = "admin",
  SUPERADMIN = "superadmin",
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  roles: Role[];
}

export interface IAuthPayload {
  token: string;
  user: IUser;
}

export enum AuthActionTypes {
  LOG_IN = "LOG_IN",
  LOG_OUT = "LOG_OUT",
}

export type AuthAction =
  | {
      type: AuthActionTypes.LOG_IN;
      payload: IAuthPayload;
    }
  | { type: AuthActionTypes.LOG_OUT; payload: null };
