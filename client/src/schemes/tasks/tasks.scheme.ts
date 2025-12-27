import * as Yup from "yup";

export const taskValidationSchema = Yup.object().shape({
  title: Yup.string().required("Task title is required"),
  description: Yup.string().required("Description is required"),
  projectId: Yup.string().required("Project selection is required"),
});
