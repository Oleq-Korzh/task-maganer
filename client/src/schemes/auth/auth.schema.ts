import * as Yup from "yup";

export const AuthValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Enter more than 4 characters")
    .max(30, "Name is too long")
    .matches(/^[A-Za-z]+$/, "Only characters are allowed")
    .required("Name is required"),
  username: Yup.string()
    .min(6, "Enter more than 6 characters")
    .max(20, "Username is too long")
    .matches(/^[a-z0-9]+$/i, "Only numbers and characters are allowed")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Enter more than 6 characters")
    .max(50, "Password is too long")
    .required("Password is required"),
  avatarUrl: Yup.string()
    .min(6, "Enter more than 6 characters")
    .matches(/^(https?:\/\/)/, "URL must start with http:// or https://")
    .required("Password is required"),
});
