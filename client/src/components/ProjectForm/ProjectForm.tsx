import { PROJECT_PRIORITIES } from "@constants/projectPriorities";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { ProjectFormComponentProps } from "./ProjectForm.types";

import styles from "./ProjectForm.module.scss";

const ProjectForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  submitLabel = "Save",
}: ProjectFormComponentProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Form className={styles.Form}>
        <div className={styles.formGroup}>
          <Field
            name="title"
            type="text"
            placeholder="Enter project title"
          />
          <ErrorMessage name="title" component="div" className={styles.errorMsg} />
        </div>

        <div className={styles.formGroup}>
          <Field
            name="description"
            as="textarea"
            placeholder="Enter project description"
          />
          <ErrorMessage
            name="description"
            component="div"
            className={styles.errorMsg}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Priority</label>
          <Field name="priority" as="select">
            {Object.entries(PROJECT_PRIORITIES).map(([key, priority]) => (
              <option key={key} value={key}>
                {priority}
              </option>
            ))}
          </Field>
        </div>

        <div className={styles.actions}>
          <button className={styles.submitBtn} type="submit">
            {submitLabel}
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default ProjectForm;
