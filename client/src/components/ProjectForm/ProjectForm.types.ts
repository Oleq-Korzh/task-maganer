import { IdType } from "@models/id.types";
import { ProjectFormTypes } from "@models/project.types";
import * as Yup from "yup";

export type ProjectFormValues = Pick<ProjectFormTypes, "title" | "description">;

export interface ProjectFormComponentProps {
  creatorId?: IdType;
  initialValues: ProjectFormTypes;
  validationSchema: Yup.ObjectSchema<ProjectFormValues>;
  onSubmit: (values: ProjectFormTypes) => void;
  submitLabel?: string;
}
