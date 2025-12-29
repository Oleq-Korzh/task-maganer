import { USER_ROLES } from "@constants/userRoles";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { RegisterFormComponentProps } from "./RegisterForm.types";

import styles from "./RegisterForm.module.scss";

const RegisterForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  submitLabel = "Save",
}: RegisterFormComponentProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Form className={styles.form}>
        <div className={styles.field}>
          <label>Full name</label>
          <Field name="name" type="text" placeholder="Enter your fullname" />
          <ErrorMessage name="name" component="div" className={styles.error} />
        </div>

        <div className={styles.field}>
          <label>Username</label>
          <Field name="username" type="text" placeholder="Enter username" />
          <ErrorMessage
            name="username"
            component="div"
            className={styles.error}
          />
        </div>

        <div className={styles.field}>
          <label>Password</label>
          <Field name="password" type="password" placeholder="Enter password" />
          <ErrorMessage
            name="password"
            component="div"
            className={styles.error}
          />
        </div>

        <div className={styles.field}>
          <label>Role</label>
          <Field name="role" as="select">
            {Object.entries(USER_ROLES).map(([key, role]) => (
              <option key={key} value={key}>
                {role}
              </option>
            ))}
          </Field>
        </div>

        <div className={styles.field}>
          <label>Avatar URL</label>
          <Field name="avatarUrl" type="text" placeholder="https://..." />
          <ErrorMessage
            name="avatarUrl"
            component="div"
            className={styles.error}
          />
        </div>

        <button type="submit" className={styles.submit}>
          {submitLabel}
        </button>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
