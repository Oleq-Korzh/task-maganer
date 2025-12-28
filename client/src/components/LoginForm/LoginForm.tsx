import { ErrorMessage, Field, Form, Formik } from "formik";

import LoginFormObserver from "./LoginForm.observer";
import { LoginFormProps } from "./LoginForm.types";

import styles from "./LoginForm.module.scss";

const LoginForm = ({
  onSubmit,
  initialValues,
  error,
  schema,
}: LoginFormProps) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={schema}
    >
      <Form className={styles.form}>
        <LoginFormObserver />
        <div>
          <Field name="username" type="text" placeholder="Your username" />
          <ErrorMessage name="username" component="div" />
        </div>
        <div>
          <Field name="password" type="text" placeholder="Your password" />
          <ErrorMessage name="password" component="div" />
        </div>
        <button type="submit">Login</button>
        {error && <div>{error}</div>}
      </Form>
    </Formik>
  );
};

export default LoginForm;
