import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

import {
  NewProjectPayload,
  Project,
  ProjectsState,
} from "./types/projects.types";

const initialState: ProjectsState = {
  data: [],
  loaded: false,
};

/*
  project: {
    id: string,
    title: string,
    priority: string,
    descrition: string,
  }

  CRUD
*/

const PROJECTS_URL = "http://localhost:3000/projects";

export const getProjectsAsync = createAsyncThunk<Project[]>(
  "projects/getList",
  async () => {
    const result = await axios.get<Project[]>(PROJECTS_URL);
    return result.data;
  }
);

export const saveProjectAsync = createAsyncThunk<Project, NewProjectPayload>(
  "projects/save",
  async (payload) => {
    const result = await axios.post<Project>(PROJECTS_URL, payload);
    return result.data;
  }
);

export const deleteProjectAsync = createAsyncThunk<Project[], string>(
  "projects/delete",
  async (id) => {
    const result = await axios.delete<Project[]>(`${PROJECTS_URL}/${id}`);

    return result.data;
  }
);

export const editProjectAsync = createAsyncThunk<
  Project[],
  { id: string; payload: Partial<Project> }
>("projects/edit", async ({ id, payload }, { rejectWithValue }) => {
  try {
    const result = await axios.put(`${PROJECTS_URL}/${id}`, payload);

    return result.data;
  } catch (error) {
    console.log(error);

    return rejectWithValue(error);
  }
});

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    // addProject: (state, action) => {
    //   // generate id
    //   // if integer needed:
    //   // const id = Date.now();
    //   const id = uuidv4(); // each time - new unique id
    //   // add to store
    //   const newProject = {
    //     id,
    //     ...action.payload,
    //   };
    //   state.data.push(newProject);
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(getProjectsAsync.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(deleteProjectAsync.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(saveProjectAsync.fulfilled, (state, action) => {
      state.data.push(action.payload);
      state.loaded = true;
    });

    builder.addCase(editProjectAsync.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(editProjectAsync.rejected, (state, action) => {
      console.log(action);
    });
  },
});

export default projectsSlice.reducer;
