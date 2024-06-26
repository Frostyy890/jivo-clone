import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { authenticateAction, logoutAction } from "../actions/AuthActions";

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
  success: boolean;
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
  success: false,
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
    builder.addCase(authenticateAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(authenticateAction.fulfilled, (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.user;
      state.success = true;
      console.log(state.isAuthenticated);
      state.isAuthenticated = true;
    });
    builder.addCase(authenticateAction.rejected, (state, { error }) => {
      state.error = error;
    });

    builder.addCase(logoutAction.fulfilled, (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    });

    builder.addCase(logoutAction.rejected, (state, { error }) => {
      state.error = error;
    });
  },
});

export default authSlice.reducer;
