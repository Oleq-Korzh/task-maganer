import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import TaskForm from "@components/TaskForm/TaskForm";
import { DEFAULT_TASK_PRIORITY } from "@constants/taskPriorities";
import { DEFAULT_TASK_STATUS } from "@constants/taskStatus";
import { TaskFormProps } from "@models/task.types";
import { APP_ROUTES } from "@router/routes";
import { taskValidationSchema } from "@schemes/tasks/tasks.scheme";
import { getProjectsAsync } from "@store/features/projects";
import { editTaskAsync, getTasksAsync } from "@store/features/tasks";
import { useAppDispatch, useAppSelector } from "@store/hooks";

import styles from "./EditTask.module.scss";

const EditTask = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<"id">();
  const { data: projects } = useAppSelector((state) => state.projects);
  const { data: tasks } = useAppSelector((state) => state.tasks);
  const currentTask = tasks.find((task) => task.id === id);

  const initialValues: TaskFormProps = {
    title: currentTask?.title || "",
    description: currentTask?.description || "",
    priority: currentTask?.priority || DEFAULT_TASK_PRIORITY,
    status: currentTask?.status || DEFAULT_TASK_STATUS,
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
    <div className={styles.EditTask}>
      <h2>
        Edit Task{" "}
        {currentTask?.title && <span>{currentTask?.title}</span>}
      </h2>

      <TaskForm
        initialValues={initialValues}
        validationSchema={taskValidationSchema}
        onSubmit={handleSubmit}
        onCancel={handleBackButton}
        projects={projects}
        submitLabel="Save Changes"
      />
    </div>
  );
};

export default EditTask;
