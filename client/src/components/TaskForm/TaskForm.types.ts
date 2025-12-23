import { ProjectTypes } from "@models/project.types";
import { TaskFormProps } from "@models/task.types";
import * as Yup from "yup";

export type TaskFormValues = Pick<
  TaskFormProps,
  "title" | "description" | "projectId"
>;

export interface TaskFormComponentProps {
  initialValues: TaskFormProps;
  validationSchema: Yup.ObjectSchema<TaskFormValues>;
  onSubmit: (values: TaskFormProps) => void;
  onCancel: () => void;
  projects: ProjectTypes[];
  submitLabel?: string;
}
