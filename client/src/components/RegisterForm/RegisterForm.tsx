import { USER_ROLES } from "@constants/userRoles";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { RegisterFormComponentProps } from "./RegisterForm.types";

import styles from "./ProjectForm.module.scss";

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
      <Form>
        <div>
          <Field name="name" type="text" placeholder="Enter your fullname" />
          <ErrorMessage name="name" component="div" />
        </div>

        <div>
          <Field name="username" as="text" placeholder="Enter username" />
          <ErrorMessage name="username" component="div" />
        </div>

        <div>
          <Field name="password" as="text" placeholder="Enter password" />
          <ErrorMessage name="password" component="div" />
        </div>

        <div>
          <label>Role</label>
          <Field name="role" as="select">
            {Object.entries(USER_ROLES).map(([key, role]) => (
              <option key={key} value={key}>
                {role}
              </option>
            ))}
          </Field>
        </div>

        <div>
          <Field name="avatar-url" as="text" placeholder="Enter avatar-url" />
          <ErrorMessage name="avatar-url" component="div" />
        </div>

        <div>
          <button type="submit">{submitLabel}</button>
        </div>
      </Form>
    </Formik>
  );
};

export default RegisterForm;
