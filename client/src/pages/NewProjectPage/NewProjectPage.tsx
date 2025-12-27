import { useNavigate } from "react-router";
import ProjectForm from "@components/ProjectForm/ProjectForm";
import { DEFAULT_PROJECT_PRIORITY } from "@constants/projectPriorities";
import { ProjectFormTypes } from "@models/project.types";
import { APP_ROUTES } from "@router/routes";
import { ProjectValidationSchema } from "@schemes/projects/projects.schema";
import { saveProjectAsync } from "@store/features/projects";
import { useAppDispatch } from "@store/hooks";

import styles from "./NewProjectPage.module.scss";

const NewProjectPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const projectFormInitialValues: ProjectFormTypes = {
    title: "",
    description: "",
    priority: DEFAULT_PROJECT_PRIORITY,
  };

  const handleSubmit = async (values: ProjectFormTypes) => {
    try {
      const title = values.title.trim();
      const description = values.description.trim();
      const priority = values.priority;

      await dispatch(
        saveProjectAsync({ title, description, priority })
      ).unwrap();

      navigate(APP_ROUTES.PROJECTS_URL);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoToBack = () => {
    navigate(APP_ROUTES.PROJECTS_URL);
  };

  return (
    <div className={styles.NewProjectPage}>
      <div className={styles.backButton} onClick={handleGoToBack}>
        Go Back
      </div>
      <h1>Add new Project</h1>
      <ProjectForm
        initialValues={projectFormInitialValues}
        validationSchema={ProjectValidationSchema}
        onSubmit={handleSubmit}
        submitLabel="Create Project"
      />
    </div>
  );
};

export default NewProjectPage;
