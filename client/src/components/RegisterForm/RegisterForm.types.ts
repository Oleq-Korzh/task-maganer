import { ProjectFormTypes } from "@models/project.types";
import { RegisterFormProps } from "@store/features/auth/auth.types";
import * as Yup from "yup";

export type ProjectFormValues = Pick<ProjectFormTypes, "title" | "description">;

export interface RegisterFormComponentProps {
  initialValues: RegisterFormProps;
  validationSchema: Yup.ObjectSchema<RegisterFormProps>;
  onSubmit: (values: RegisterFormProps) => void;
  submitLabel?: string;
}
