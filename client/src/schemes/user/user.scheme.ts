import * as Yup from "yup";

export const userValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Min 4 symbols")
    .required("Username is required"),
  password: Yup.string()
    .min(4, "Min 4 symbols")
    .required("Password is required"),
});
