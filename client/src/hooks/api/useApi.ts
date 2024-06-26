import React from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useAppSelector } from "@/redux/store";

export const useApi = () => {
  // const [error, setError] = React.useState<any>(null);
  let error: any = null;

  axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "";
  axios.defaults.withCredentials = true;
  // const tokenType = import.meta.env.VITE_TOKEN_TYPE || "Bearer";
  // if (token) axios.defaults.headers.common["Authorization"] = tokenType + " " + token;

  const apiRequest = async (config: AxiosRequestConfig<any>) => {
    return axios(config)
      .then((res) => res)
      .catch((err) => {
        console.error(err);
        error = err.response?.data?.message || err.message || err;
        // setError(err.message || err);
      });
  };

  return { apiRequest, error };
};
