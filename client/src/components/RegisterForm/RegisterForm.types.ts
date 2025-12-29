import { ProjectFormTypes } from "@models/project.types";
import { ResetFormTypes } from "@pages/RegisterPage/RegisterPage.types";
import { RegisterFormProps } from "@store/features/auth/auth.types";
import * as Yup from "yup";

export type ProjectFormValues = Pick<ProjectFormTypes, "title" | "description">;

export type RegisterSchemaProps = Omit<RegisterFormProps, "role">;
export interface RegisterFormComponentProps {
  initialValues: RegisterFormProps;
  validationSchema?: Yup.ObjectSchema<RegisterSchemaProps>;
  onSubmit: (values: RegisterFormProps, FormikHelpers: ResetFormTypes) => void;
  submitLabel?: string;
}
