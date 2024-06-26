import { createAsyncThunk } from "@reduxjs/toolkit";
import { useApi } from "@/hooks/api/useApi";
import { SignInFormData } from "@/pages/auth/components/SignInForm";
import { SignUpFormData } from "@/pages/auth/components/SignUpForm";
import Cookies from "js-cookie";

export enum AuthActionEnum {
  LOGIN = "login",
  REGISTER = "register",
}

export const authenticateAction = createAsyncThunk(
  "auth/authenticate",
  async (
    data: { action: AuthActionEnum; userInfo: SignInFormData | SignUpFormData },
    { rejectWithValue }
  ) => {
    const { apiRequest, error } = useApi();
    const res = await apiRequest({
      url: `/auth/${data.action}`,
      method: "POST",
      data: data.userInfo,
    });
    if (error) {
      return rejectWithValue(error);
    }

    Cookies.set("token", res?.data?.token);
    sessionStorage.setItem("user", JSON.stringify(res?.data?.user));

    return res?.data;
  }
);

export const logoutAction = createAsyncThunk("auth/logout", async () => {
  const { apiRequest, error } = useApi();
  const res = await apiRequest({
    url: "/auth/logout",
    method: "POST",
  });
  if (error) return error;

  if (res?.status === 204) {
    Cookies.remove("token");
    sessionStorage.removeItem("user");
  }
});
