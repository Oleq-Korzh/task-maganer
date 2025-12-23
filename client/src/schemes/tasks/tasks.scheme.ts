import * as Yup from "yup";

export const taskValidationSchema = Yup.object().shape({
  title: Yup.string().required("Название задачи обязательно"),
  description: Yup.string().required("Описание обязательно"),
  projectId: Yup.string().required("Необходимо выбрать проект"),
});
