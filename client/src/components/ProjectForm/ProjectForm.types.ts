import { ProjectFormTypes } from "@models/project.types";
import * as Yup from "yup";

export type ProjectFormValues = Pick<ProjectFormTypes, "title" | "description">;

export interface ProjectFormComponentProps {
  initialValues: ProjectFormTypes;
  validationSchema: Yup.ObjectSchema<ProjectFormValues>;
  onSubmit: (values: ProjectFormTypes) => void;
  submitLabel?: string;
}
