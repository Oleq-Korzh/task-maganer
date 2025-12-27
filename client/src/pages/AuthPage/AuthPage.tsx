import { useState } from "react";
import { loginAsync } from "@store/features/auth";
import { useAppDispatch, useAppSelector } from "@store/hooks";

import styles from "./AuthPage.module.scss";

const AuthPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username.trim() !== "" && password.trim() !== "") {
      dispatch(loginAsync({ username, password }));
      setUsername("");
      setPassword("");
    }
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
