import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { TASK_STATUS } from "@constants/taskStatus";
import { capitalizeFirstLetter } from "@helpers/dom";
import { TaskProps, TasksColumnsProps } from "@models/task.types";
import { APP_ROUTES } from "@router/routes";
import { IdType } from "@models/id.types";
import TaskCard from "../../components/TaskCard/TaskCard";
import { getTasksAsync } from "../../store/features/tasks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { TaskStatusProps } from "@models/task.types";
import { editTaskAsync } from "../../store/features/tasks";

import "./TasksPage.scss";

const TasksPage = () => {
  const [filterDate, setFilterDate] = useState("NEW");
  const { data: tasks } = useAppSelector((state) => state.tasks);
  const { projectId } = useParams<"projectId">();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTasksAsync(projectId));
  }, [dispatch, projectId]);

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

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: IdType) => {
    e.dataTransfer.setData("taskId", taskId.toString());
    e.dataTransfer.effectAllowed = "move";
  }
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStatus: TaskStatusProps) => {
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
    <div className="TasksPage">
      <div className="BackBtn" onClick={handleBackPage}>
        Все проекты
      </div>

      <div className="TopPanel">
        <div className="Filters">
          <select
            className="FilterSelect"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          >
            <option value="NEW">Сначала новые</option>
            <option value="OLD">Сначала старые</option>
          </select>
        </div>

        <button className="AddTaskBtn" onClick={handleAddNewProject}>
          + Create new task
        </button>
      </div>

      {filteredTasks.length === 0 && (
        <span className="Empty">No tasks available</span>
      )}

      
      <div className="Board">
        {Object.values(TASK_STATUS).map((status) => (
          <div key={status} className="Column" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, status)}>
            <h3>{capitalizeFirstLetter(status)}</h3>

            {tasksByStatus[status].map((task) => (
              <div key={task.id} id='draggable' draggable="true" onDragStart={(e) => handleDragStart(e, task.id)}>
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
