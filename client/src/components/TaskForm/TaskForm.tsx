import { TASKS_PRIORITIES } from "@constants/taskPriorities";
import { TASK_STATUS } from "@constants/taskStatus";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { TaskFormComponentProps } from "./TaskForm.types";

import styles from "./TaskForm.module.scss";

const TaskForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  projects,
  onCancel,
  submitLabel = "Create Task",
}: TaskFormComponentProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Form className={styles.Form}>
        <div className={styles.formGroup}>
          <Field name="title" type="text" placeholder="Task Title" />
          <ErrorMessage name="title" component="div" className={styles.errorMsg} />
        </div>

        <div className={styles.formGroup}>
          <Field name="description" as="textarea" placeholder="Description" />
          <ErrorMessage
            name="description"
            component="div"
            className={styles.errorMsg}
          />
        </div>

        <div className={styles.formGroup}>
          <Field name="assignee" type="text" placeholder="Assignee" />
          <ErrorMessage name="assignee" component="div" className={styles.errorMsg} />
        </div>

        <div className={styles.formGroup}>
          <label>Priority</label>
          <Field name="priority" as="select">
            {Object.entries(TASKS_PRIORITIES).map(([key, priority]) => (
              <option key={key} value={key}>
                {priority}
              </option>
            ))}
          </Field>
        </div>

        <div className={styles.formGroup}>
          <label>Status</label>
          <Field name="status" as="select">
            {Object.entries(TASK_STATUS).map(([key, status]) => (
              <option key={key} value={key?.toLowerCase()}>
                {status}
              </option>
            ))}
          </Field>
        </div>

        <div className={styles.formGroup}>
          <label>Project</label>
          <Field name="projectId" as="select">
            <option value="">Select project...</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="projectId"
            component="div"
            className={styles.errorMsg}
          />
        </div>

        <div className={styles.actions}>
          <button className={styles.submitBtn} type="submit">
            {submitLabel}
          </button>
          <button className={styles.cancelBtn} type="button" onClick={onCancel}>
            Back
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default TaskForm;
