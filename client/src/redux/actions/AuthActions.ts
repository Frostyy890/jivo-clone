import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SignInFormData } from "@/pages/auth/components/SignInForm";
import { SignUpFormData } from "@/pages/auth/components/SignUpForm";

export const baseURL = import.meta.env.VITE_BASE_URL || "";
const axiosDefaults = { baseURL };
const httpRequest = axios.create(axiosDefaults);

export const registerAction = createAsyncThunk(
  "auth/register",
  async (data: SignUpFormData, { rejectWithValue }) => {
    return await httpRequest({
      url: "/auth/register",
      method: "POST",
      data,
    })
      .then((res) => res.data)
      .catch((error: any) => {
        console.error(error);
        if (error?.response && error.response?.data?.errors) {
          return rejectWithValue(error.response.data.errors[0].message);
        }
        return rejectWithValue(error?.message);
      });
  }
);
export const loginAction = createAsyncThunk(
  "auth/login",
  async (data: SignInFormData, { rejectWithValue }) => {
    return await httpRequest({
      url: "/auth/login",
      method: "POST",
      data,
    })
      .then((res) => res.data)
      .catch((error: any) => {
        if (error?.response && error.response?.data?.errors) {
          return rejectWithValue(error.response.data.errors[0].message);
        }
        return rejectWithValue(error?.message);
      });
  }
);

export const logoutAction = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      return await httpRequest({ url: "/auth/logout", method: "POST" });
    } catch (error: any) {
      console.error(error);
      if (error?.response && error.response?.data?.errors) {
        return rejectWithValue(error.response.data.errors[0].message);
      }
      return rejectWithValue(error?.message);
    }
  }
);
