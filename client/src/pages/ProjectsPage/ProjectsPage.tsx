import { useEffect, useMemo } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import Snowfall from "react-snowfall";
import ProjectCard from "@components/ProjectCard/ProjectCard";
import { APP_ROUTES } from "@router/routes";
import { getProjectsAsync } from "@store/features/projects";
import { useAppDispatch, useAppSelector } from "@store/hooks";

import styles from "./ProjectsPage.module.scss";

const ProjectsPage = () => {
  const [search, setSearch] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("ALL");
  const { data: projects } = useAppSelector((state) => state.projects);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProjectsAsync());
  }, [dispatch]);

  const handleClick = (projectId: string) => {
    navigate(`/tasks/${projectId}`);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredProjects = useMemo(
    () =>
      projects
        .filter((project) => project.title.toLowerCase().includes(search))
        .filter((project) =>
          priorityFilter === "ALL" ? true : project.priority === priorityFilter
        ),
    [projects, search, priorityFilter]
  );

  return (
    <div className={styles.projectsPage}>
      <h1 className={styles.title}>Projects</h1>
      <Snowfall color="lightblue" snowflakeCount={200} />
      <div className={styles.filtersBar}>
        <input
          type="text"
          value={search}
          onInput={handleSearchInput}
          placeholder="Search project..."
        />

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="ALL">All Priorities</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
      </div>

      <button
        type="button"
        className={styles.addProjectBtn}
        onClick={() => navigate(APP_ROUTES.NEW_PROJECT_URL)}
      >
        Add Project
      </button>

      <div className={styles.projects}>
        {filteredProjects.length === 0 && (
          <span className={styles.emptyMessage}>No projects available</span>
        )}

        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} {...project} onClick={handleClick} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
