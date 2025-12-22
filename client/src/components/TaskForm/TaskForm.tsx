import { Formik, Form, Field, ErrorMessage } from "formik";
import { TASKS_PRIORITIES } from "@constants/taskPriorities";
import { TASK_STATUS } from "@constants/taskStatus";
import { TaskFormProps } from "@models/task.types";
import { ProjectTypes } from "@models/project.types";
import "./TaskForm.scss";

interface TaskFormComponentProps {
  initialValues: TaskFormProps;
  validationSchema: any;
  onSubmit: (values: TaskFormProps) => void;
  onCancel: () => void;
  projects: ProjectTypes[];
  submitLabel?: string;
}

const TaskForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  projects,
  submitLabel = "Создать задачу",
  
}: TaskFormComponentProps) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      <Form className="Form">
        <div className="form-group">
          <Field name="title" type="text" placeholder="Название задачи" />
          <ErrorMessage name="title" component="div" className="error-msg" />
        </div>

        <div className="form-group">
          <Field name="description" as="textarea" placeholder="Описание" />
          <ErrorMessage
            name="description"
            component="div"
            className="error-msg"
          />
        </div>

        <div className="form-group">
          <Field name="assignee" type="text" placeholder="Исполнитель" />
          <ErrorMessage name="assignee" component="div" className="error-msg" />
        </div>

        <div className="form-group">
          <label>Приоритет</label>
          <Field name="priority" as="select">
            {Object.entries(TASKS_PRIORITIES).map(([key, priority]) => (
              <option key={key} value={key}>
                {priority}
              </option>
            ))}
          </Field>
        </div>

        <div className="form-group">
          <label>Статус</label>
          <Field name="status" as="select">
            {Object.entries(TASK_STATUS).map(([key, status]) => (
              <option key={key} value={key?.toLowerCase()}>
                {status}
              </option>
            ))}
          </Field>
        </div>

        
          <div className="form-group">
            <label>Проект</label>
            <Field name="projectId" as="select">
              <option value="">Выберите проект…</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="projectId"
              component="div"
              className="error-msg"
            />
          </div>
        

        <button className="SaveBtn" type="submit">
          {submitLabel}
        </button>

    
      </Form>
    </Formik>
  );
};

export default TaskForm;
