import LoginForm from "@components/LoginForm/LoginForm";
import { userValidationSchema } from "@schemes/user/user.scheme";
import { loginAsync } from "@store/features/auth";
import { LoginCredentials } from "@store/features/types/auth.types";
import { useAppDispatch, useAppSelector } from "@store/hooks";

import styles from "./AuthPage.module.scss";

const AuthPage = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((store) => store?.auth);

  const initialValues: LoginCredentials = {
    username: "",
    password: "",
  };

  const handleSubmit = ({ username, password }: LoginCredentials) => {
    const trimmedValues = {
      username: username.trim(),
      password: password.trim(),
    };

    dispatch(loginAsync(trimmedValues));
  };

  return (
    <div className={styles.AuthPage}>
      <div className={styles.card}>
        <h2>Welcome Back</h2>
        <LoginForm
          error={error}
          initialValues={initialValues}
          onSubmit={handleSubmit}
          schema={userValidationSchema}
        />
      </div>
    </div>
  );
};

export default AuthPage;
