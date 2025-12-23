import { PROJECT_PRIORITIES } from "@constants/projectPriorities";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { ProjectFormComponentProps } from "./ProjectForm.types";

import "./ProjectForm.scss";

const ProjectForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  submitLabel = "Сохранить",
}: ProjectFormComponentProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Form className="ProjectForm">
        <div className="form-group">
          <Field
            name="title"
            type="text"
            placeholder="Введите название проекта"
          />
          <ErrorMessage name="title" component="div" className="error-msg" />
        </div>

        <div className="form-group">
          <Field
            name="description"
            as="textarea"
            placeholder="Введите описание проекта"
          />
          <ErrorMessage
            name="description"
            component="div"
            className="error-msg"
          />
        </div>

        <div className="form-group">
          <label>Приоритет</label>
          <Field name="priority" as="select">
            {Object.entries(PROJECT_PRIORITIES).map(([key, priority]) => (
              <option key={key} value={key}>
                {priority}
              </option>
            ))}
          </Field>
        </div>

        <button className="SaveBtn" type="submit">
          {submitLabel}
        </button>
      </Form>
    </Formik>
  );
};

export default ProjectForm;
