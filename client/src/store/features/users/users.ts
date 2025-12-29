import { API_ROUTES } from "@api/apiRoutes";
import { UserProps } from "@models/user.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { RegisterFormProps } from "../auth/auth.types";

import { usersAdapter } from "./users.adapter";

const initialState = usersAdapter.getInitialState({
  isInit: false,
});

export const getUsersAsync = createAsyncThunk("users/getList", async () => {
  const result = await axios.get(`${API_ROUTES.USERS}`);

  return result.data;
});

export const registerAsync = createAsyncThunk<UserProps, RegisterFormProps>(
  "users/newuser",
  async (newUser) => {
    const result = await axios.post(`${API_ROUTES.NEW_USER}`, newUser);

    return result.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersAsync.fulfilled, (state, action) => {
      usersAdapter.setAll(state, action.payload);
      state.isInit = true;
    });
    builder.addCase(getUsersAsync.rejected, (state, action) => {
      usersAdapter.setAll(state, []);
      state.isInit = false;
      console.error(action?.error?.message);
    });
    builder.addCase(registerAsync.fulfilled, (state, action) => {
      usersAdapter.addOne(state, action.payload);
    });
  },
});

export default usersSlice.reducer;
