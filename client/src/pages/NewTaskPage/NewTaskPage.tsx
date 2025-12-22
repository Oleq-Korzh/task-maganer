import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import * as Yup from "yup";

import { DEFAULT_TASK_PRIORITY } from "@constants/taskPriorities";
import { DEFAULT_TASK_STATUS } from "@constants/taskStatus";
import TaskForm from "../../components/TaskForm/TaskForm";
import {
  TaskFormProps,
  TaskPriotiryProps,
  TaskStatusProps,
} from "@models/task.types";
import { APP_ROUTES } from "@router/routes";

import { getProjectsAsync } from "../../store/features/projects";
import { saveTaskAsync } from "../../store/features/tasks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import "./NewTaskPage.scss";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Название задачи обязательно"),
  description: Yup.string().required("Описание обязательно"),
  projectId: Yup.string().required("Необходимо выбрать проект"),
});

const NewTaskPage = () => {
  const { projectId } = useParams<"projectId">();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: projects } = useAppSelector((state) => state.projects);
  const currentProject = projects.find((project) => project.id === projectId);

  const initialValues: TaskFormProps = {
    title: "",
    description: "",
    priority: DEFAULT_TASK_PRIORITY as TaskPriotiryProps,
    status: DEFAULT_TASK_STATUS as TaskStatusProps,
    assignee: "",
    projectId: projectId || "",
  };

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(getProjectsAsync());
    }
  }, [projects, dispatch]);

  const handleSubmit = (values: typeof initialValues) => {
    const newTask: TaskFormProps = {
      title: values.title,
      description: values.description,
      priority: values.priority,
      status: values.status,
      assignee: values.assignee,
      projectId: values.projectId,
    };

    dispatch(saveTaskAsync(newTask));

    navigate(
      `${APP_ROUTES.SINGLE_PROJECT.replace(":projectId", values.projectId)}`
    );
  };

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <div className="AddTaskPage">
      <h2>
        Добавить задачу{" "}
        {currentProject && <span>для проекта {currentProject?.title}</span>}
      </h2>

      <TaskForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        onCancel={handleBackButton}
        projects={projects}
       
      />
    </div>
  );
};

export default NewTaskPage;
