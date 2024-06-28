import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {
  loginAction,
  logoutAction,
  registerAction,
} from "../actions/AuthActions";

enum Role {
  USER = "user",
  ADMIN = "admin",
  SUPERADMIN = "superadmin",
}
interface IUser {
  id: string;
  username: string;
  email: string;
  roles: Role[];
}
interface IAuthState {
  loading: boolean;
  error: any;
  token: string | null;
  user: IUser | null;
  isAuthenticated: boolean;
}

const getToken = (): string | null => Cookies.get("token") || null;
const getUser = (): IUser | null => {
  const userFromStorage = sessionStorage.getItem("user");
  return userFromStorage && JSON.parse(userFromStorage);
};

const initialState: IAuthState = {
  loading: false,
  error: null,
  token: getToken(),
  user: getUser(),
  isAuthenticated: !!getToken() && !!getUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.token = payload.token;
        state.user = payload.user;
        state.isAuthenticated = !!payload.token && !!payload.user;
        Cookies.set("token", payload.token);
        sessionStorage.setItem("user", JSON.stringify(payload.user));
        return state;
      })
      .addCase(loginAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // register
      .addCase(registerAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.token = payload.token;
        state.user = payload.user;
        state.isAuthenticated = !!payload.token && !!payload.user;
        Cookies.set("token", payload.token);
        sessionStorage.setItem("user", JSON.stringify(payload.user));
        return state;
      })
      .addCase(registerAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      //logout
      .addCase(logoutAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        Cookies.remove("token");
        sessionStorage.removeItem("user");
        return state;
      })
      .addCase(logoutAction.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default authSlice.reducer;
