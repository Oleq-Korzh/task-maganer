import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import Snowfall from "react-snowfall";
import TaskCard from "@components/TaskCard/TaskCard";
import { TASK_STATUS } from "@constants/taskStatus";
import { capitalizeFirstLetter } from "@helpers/dom";
import { IdType } from "@models/id.types";
import { TaskProps, TasksColumnsProps } from "@models/task.types";
import { TaskStatusProps } from "@models/task.types";
import { APP_ROUTES } from "@router/routes";
import { getProjectsAsync } from "@store/features/projects";
import { getTasksAsync } from "@store/features/tasks";
import { editTaskAsync } from "@store/features/tasks";
import { useAppDispatch, useAppSelector } from "@store/hooks";

import styles from "./TasksPage.module.scss";

const TasksPage = () => {
  const [filterDate, setFilterDate] = useState("NEW");
  const { data: tasks } = useAppSelector((store) => store.tasks);
  const { data: projects } = useAppSelector((store) => store.projects);
  const { projectId } = useParams<"projectId">();
  const findProject = projects.find((project) => project.id === projectId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTasksAsync(projectId));
  }, [dispatch, projectId]);

  useEffect(() => {
    if (projects.length) {
      return;
    }

    dispatch(getProjectsAsync());
  }, [dispatch, projects.length]);

  const handleBackPage = () => {
    navigate(APP_ROUTES.PROJECTS_URL);
  };

  const handleAddNewProject = () => {
    if (projectId) {
      navigate(
        `${APP_ROUTES.NEW_TASK_IN_PROJECT_URL.replace(":projectId", projectId)}`
      );
    } else {
      navigate(APP_ROUTES.NEW_TASK_URL);
    }
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    taskId: IdType
  ) => {
    e.dataTransfer.setData("taskId", taskId.toString());
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    newStatus: TaskStatusProps
  ) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    if (!taskId) return;
    const task = tasks.find((t) => t.id === taskId);
    if (task && task.status !== newStatus) {
      dispatch(editTaskAsync({ id: taskId, payload: { status: newStatus } }));
    }
  };

  const filteredTasks = useMemo<TaskProps[]>(() => {
    const filtered = projectId
      ? tasks.filter((task) => task.projectId === projectId)
      : tasks;

    return [...filtered].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      return filterDate === "OLD"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });
  }, [tasks, filterDate, projectId]);

  const emptyColumns: TasksColumnsProps = {
    [TASK_STATUS.TODO]: [],
    [TASK_STATUS.IN_PROGRESS]: [],
    [TASK_STATUS.BLOCKED]: [],
    [TASK_STATUS.TESTING]: [],
    [TASK_STATUS.DONE]: [],
  };

  const tasksByStatus = filteredTasks.reduce<TasksColumnsProps>(
    (acc, task) => {
      acc[task.status].push(task);
      return acc;
    },
    { ...emptyColumns }
  );

  return (
    <div className={styles.TasksPage}>
      {!findProject && <h1 className={styles.title}>Tasks</h1>}
      {findProject && (
        <>
          <h1 className={styles.title}>
            Tasks for project: {findProject.title}
          </h1>
          <div>Descrition: {findProject.description}</div>
        </>
      )}
      <Snowfall color="lightblue" snowflakeCount={200} />
      <div className={styles.BackBtn} onClick={handleBackPage}>
        All Projects
      </div>

      <div className={styles.TopPanel}>
        <div className={styles.Filters}>
          <select
            className={styles.FilterSelect}
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          >
            <option value="NEW">Newest First</option>
            <option value="OLD">Oldest First</option>
          </select>
        </div>

        <button className={styles.AddTaskBtn} onClick={handleAddNewProject}>
          + Create new task
        </button>
      </div>

      {filteredTasks.length === 0 && (
        <span className={styles.Empty}>No tasks available</span>
      )}

      <div className={styles.Board}>
        {Object.values(TASK_STATUS).map((status) => (
          <div
            key={status}
            className={styles.Column}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <h3 data-count={tasksByStatus[status].length}>
              {capitalizeFirstLetter(status)}
            </h3>

            {tasksByStatus[status].map((task) => (
              <div
                key={task.id}
                id="draggable"
                draggable="true"
                onDragStart={(e) => handleDragStart(e, task.id)}
              >
                <TaskCard key={task.id} {...task} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage;
