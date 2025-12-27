import { useState } from "react";
import { loginAsync } from "@store/features/auth";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Form, Formik } from "formik";

import styles from "./AuthPage.module.scss";

interface LoginFormValues {
  username: string;
  password: string;
}

const initialValues: LoginFormValues = {
  username: "",
  password: "",
};

const AuthPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(loginAsync({ username, password }));
  };

  return (
    <div className={styles.AuthPage}>
      <div className={styles.card}>
        <h2>Welcome Back</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
};

export default AuthPage;
