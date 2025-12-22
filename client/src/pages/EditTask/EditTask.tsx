import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import * as Yup from "yup";

import { DEFAULT_TASK_PRIORITY } from "@constants/taskPriorities";
import { DEFAULT_TASK_STATUS } from "@constants/taskStatus";
import {
  TaskFormProps,
  TaskPriotiryProps,
  TaskStatusProps,
} from "@models/task.types";
import { APP_ROUTES } from "@router/routes";

import { getProjectsAsync } from "../../store/features/projects";
import { editTaskAsync, getTasksAsync } from "../../store/features/tasks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import TaskForm from "../../components/TaskForm/TaskForm";
import "./EdiTask.scss";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Название задачи обязательно"),
  description: Yup.string().required("Описание обязательно"),
  projectId: Yup.string().required("Необходимо выбрать проект"),
});

const EditTask = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { data: projects } = useAppSelector((state) => state.projects);
  const { data: tasks } = useAppSelector((state) => state.tasks);
  const currentTask = tasks.find((task) => task.id === id);

  const initialValues: TaskFormProps = {
    title: currentTask?.title || "",
    description: currentTask?.description || "",
    priority: currentTask?.priority || (DEFAULT_TASK_PRIORITY as TaskPriotiryProps),
    status: currentTask?.status || (DEFAULT_TASK_STATUS as TaskStatusProps),
    assignee: currentTask?.assignee || "",
    projectId: currentTask?.projectId || "",
  };

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(getProjectsAsync());
    }
  }, [projects, dispatch]);

  useEffect(() => {
    if (!currentTask) {
      dispatch(getTasksAsync(""));
    }
  }, [currentTask, dispatch]);

  const handleSubmit = (values: typeof initialValues) => {
    if (!id) return;

    dispatch(editTaskAsync({ id, payload: values }));
    navigate(APP_ROUTES.SINGLE_PROJECT.replace(":projectId", values.projectId));
  };

  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <div className="AddTaskPage">
      <h2>
        Изменить задачу{" "}
        {currentTask?.title && <span>{currentTask?.title}</span>}
      </h2>

      <TaskForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        onCancel={handleBackButton}
        projects={projects}
        submitLabel="Сохранить изменения"
      />
      <button className="BackBtn" onClick={handleBackButton}>
        Назад
      </button>
    </div>
  );
};

export default EditTask;
