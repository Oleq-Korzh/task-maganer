import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { DEFAULT_PROJECT_PRIORITY } from "@constants/projectPriorities";
import { ProjectFormTypes } from "@models/project.types";
import { APP_ROUTES } from "@router/routes";
import { ProjectValidationSchema } from "@schemes/projects/projects.schema";
import {
  selectAllProjects,
  selectProjectById,
} from "@store/features/projects/projects.selector";

import ProjectForm from "../../components/ProjectForm/ProjectForm";
import {
  editProjectAsync,
  getProjectsAsync,
} from "../../store/features/projects/projects";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import styles from "./EditProject.module.scss";

const EditProject = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<"id">();

  const projects = useAppSelector(selectAllProjects);
  const currentProject = useAppSelector((state) =>
    id ? selectProjectById(state, id) : undefined
  );

  useEffect(() => {
    if (!projects.length) {
      dispatch(getProjectsAsync());
    }
  }, [dispatch, projects.length]);

  const initialValues: ProjectFormTypes = {
    title: currentProject?.title || "",
    description: currentProject?.description || "",
    priority: currentProject?.priority || DEFAULT_PROJECT_PRIORITY,
    memberIds: currentProject?.memberIds || [],
  };

  const handleSubmit = (values: ProjectFormTypes) => {
    if (!id) return;

    dispatch(editProjectAsync({ id, payload: values }));
    navigate(APP_ROUTES.PROJECTS_URL);
  };

  const handleBack = () => {
    navigate(APP_ROUTES.PROJECTS_URL);
  };

  if (!currentProject) {
    return <p>Loading project...</p>;
  }

  return (
    <div className={styles.EditProject}>
      <button className={styles.backButton} onClick={handleBack}>
        ← Back to all projects
      </button>

      <h2>Edit Project</h2>

      <ProjectForm
        creatorId={currentProject.creatorId}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={ProjectValidationSchema}
        submitLabel="Save Changes"
      />
    </div>
  );
};

export default EditProject;
