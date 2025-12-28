import { LoginCredentials } from "@store/features/auth/auth.types";
import * as Yup from "yup";

export interface LoginFormProps {
  onSubmit: (values: LoginCredentials) => void;
  initialValues: LoginCredentials;
  error: string;
  schema: Yup.ObjectSchema<LoginCredentials>;
}
