import { API_ROUTES } from "@api/apiRoutes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AuthResponse, AuthState, LoginCredentials } from "./types/auth.types";

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
    const res = await fetch(API_ROUTES?.USER?.LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cred),
    });

    const data = await res.json();

    if (!res.ok) {
      return rejectWithValue(data.error);
    }

    return data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error as string);
  }
});

export const checkAuthAsync = createAsyncThunk<AuthResponse>(
  "auth/check",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(API_ROUTES?.USER?.LOGIN_CHECK_URL);
      const data = await res.json();

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const logoutAsync = createAsyncThunk<AuthResponse>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(API_ROUTES?.USER?.LOGOUT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue("error");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.isAuth = action.payload.isAuth;
      state.user = action.payload?.user;
      state.error = "";
      state.loaded = true;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
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

export default authSlice.reducer;
