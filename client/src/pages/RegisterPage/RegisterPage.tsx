import { Link, useNavigate } from "react-router";
import Snowfall from "react-snowfall";
import RegisterForm from "@components/RegisterForm/RegisterForm";
import { DEFAULT_USER_ROLES } from "@constants/userRoles";
import { APP_ROUTES } from "@router/routes";
import { AuthValidationSchema } from "@schemes/auth/auth.schema";
import { RegisterFormProps } from "@store/features/auth/auth.types";
import { registerAsync } from "@store/features/users/users";
import { useAppDispatch } from "@store/hooks";

import { ResetFormTypes } from "./RegisterPage.types";

import styles from "./RegisterPage.module.scss";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const initialValues: RegisterFormProps = {
    name: "",
    username: "",
    password: "",
    role: DEFAULT_USER_ROLES,
    avatarUrl: "",
  };

  const handleSubmit = async (
    values: RegisterFormProps,
    { resetForm }: ResetFormTypes
  ) => {
    await dispatch(registerAsync(values));
    resetForm();
    navigate(APP_ROUTES.AUTH);
  };

  return (
    <div className={styles.page}>
      <Snowfall color="lightblue" snowflakeCount={200} />
      <div className={styles.card}>
        <h1 className={styles.title}>Create an account</h1>
        <p className={styles.subtitle}>
          Fill in the details below to create your account
        </p>

        <RegisterForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          submitLabel="Create account"
          validationSchema={AuthValidationSchema}
        />

        <div className={styles.footer}>
          <span>Already have an account?</span>
          <Link to={APP_ROUTES.AUTH}>Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
