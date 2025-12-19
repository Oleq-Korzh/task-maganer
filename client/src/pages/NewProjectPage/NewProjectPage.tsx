import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { PRIORITIES } from "../../common/priorities";
import { urls } from "../../router/menu";
import { saveProjectAsync } from "../../store/features/projects";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import "./NewProjectPage.css";

export default function NewProjectPage() {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const priorityRef = useRef<HTMLSelectElement>(null);
  const navigate = useNavigate();

  const { loaded: isProjectSaved } = useAppSelector((state) => state.projects);

  const dispatch = useAppDispatch();

  const handleSave = () => {
    if (!titleRef.current || !descriptionRef.current || !priorityRef.current)
      return;

    const title = titleRef.current.value.trim();
    const description = descriptionRef.current.value.trim();
    const priority = priorityRef.current.value as "LOW" | "HIGH" | "MEDIUM";

    dispatch(saveProjectAsync({ title, description, priority }));
  };

  const handleGoToBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (isProjectSaved) {
      navigate(urls.PROJECTS_URL);
    }
  }, [navigate, isProjectSaved]);

  return (
    <div className="NewProjectPage">
      <div onClick={handleGoToBack}>Вернуться назад</div>
      <h1>Add new Project</h1>
      <form>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            ref={titleRef}
          />
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Enter description"
            ref={descriptionRef}
          ></textarea>
        </div>
        <div>
          <select name="priority" ref={priorityRef}>
            {Object.entries(PRIORITIES).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button type="button" onClick={handleSave}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

{
  /* 
[
  [key, value],
  [key, value]
]
*/
}
