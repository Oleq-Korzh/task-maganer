import { API_ROUTES } from "@api/apiRoutes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import {
  AuthError,
  AuthResponse,
  AuthState,
  LoginCredentials,
} from "./auth.types";

const initialState: AuthState = {
  isAuth: false,
  user: {
    name: "",
    role: "",
  },
  error: "",
  loaded: false,
};

export const loginAsync = createAsyncThunk<
  AuthResponse,
  LoginCredentials,
  { rejectValue: string }
>("auth/login", async (cred, { rejectWithValue }) => {
  try {
    const res = await axios.post(API_ROUTES?.USER?.LOGIN_URL, cred);

    return res.data;
  } catch (err) {
    const error = err as AxiosError<AuthError>;

    return rejectWithValue(error.response?.data?.error || "Login failed");
  }
});

export const checkAuthAsync = createAsyncThunk<AuthResponse>(
  "auth/check",
  async () => {
    const res = await axios.get(API_ROUTES?.USER?.LOGIN_CHECK_URL);

    return res.data;
  }
);

export const logoutAsync = createAsyncThunk<AuthResponse>(
  "auth/logout",
  async () => {
    const res = await fetch(API_ROUTES?.USER?.LOGOUT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.isAuth = action.payload.isAuth;
      state.user = action.payload?.user;
      state.error = "";
      state.loaded = true;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      console.log(action);

      state.error = action.payload as string;
      state.loaded = true;
    });

    builder.addCase(checkAuthAsync.fulfilled, (state, action) => {
      state.isAuth = action.payload.isAuth;
      state.user = action.payload?.user;
      state.error = "";
      state.loaded = true;
    });

    builder.addCase(logoutAsync.fulfilled, (state, action) => {
      state.isAuth = action.payload.isAuth;
      state.user = action.payload?.user;
      state.error = "";
      state.loaded = true;
    });
  },
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
