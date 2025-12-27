import * as Yup from "yup";

export const ProjectValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(4, "Enter more than 4 characters")
    .max(30, "Title is too long")
    .required("Project title is required"),
  description: Yup.string()
    .min(10, "More detailed description needed")
    .max(100, "Description is too long")
    .required("Description is required"),
});
