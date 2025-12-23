import * as Yup from "yup";

export const ProjectValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(4, "Введите больше 4 символов")
    .max(30, "Название слишком длинное")
    .required("Название проекта обязательно"),
  description: Yup.string()
    .min(10, "Нужно более подробное описание")
    .max(100, "Описание слишком длинное")
    .required("Описание обязательно"),
});
