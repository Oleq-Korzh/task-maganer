import { IdType } from "@models/id.types";
import { UserProps } from "@models/user.types";

export interface AuthUser {
  id: IdType;
  name: string;
  role: string;
}

export interface AuthResponse {
  isAuth: boolean;
  user: AuthUser;
}

export interface AuthState {
  isAuth: boolean;
  user: AuthUser;
  error: string;
  loaded: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthError {
  error: string;
}

export type RegisterFormProps = Omit<UserProps, "id" | "projects"> &
  LoginCredentials;
