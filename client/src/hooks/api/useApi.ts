import React from "react";
import { IAuthPayload } from "@/store/auth/AuthActions";
import { AuthContext } from "@/store/auth/AuthContext";
import axios, { AxiosRequestConfig } from "axios";

export interface IAuthData extends IAuthPayload {
  success: boolean;
}

export type ApiRequestProps = {
  config: AxiosRequestConfig<any>;
  handleSuccessResponse: (data: any) => void;
  handleErrorResponse?: (data: any) => void;
};

export const useApi = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<any>(null);
  const { authState, dispatchLogOut } = React.useContext(AuthContext);
  const apiRequest = React.useCallback(
    async ({ config, handleSuccessResponse, handleErrorResponse }: ApiRequestProps) => {
      setIsLoading(true);
      setError(null);
      //AXIOS DEFAULTS
      axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "";
      axios.defaults.withCredentials = true;
      if (authState.isLoggedIn) {
        const TOKEN_TYPE = import.meta.env.VITE_TOKEN_TYPE || "Bearer";
        axios.defaults.headers.common["Authorization"] = TOKEN_TYPE + " " + authState.token;
      }
      // AXIOS REQUEST
      axios(config)
        .then((res) => handleSuccessResponse && handleSuccessResponse(res.data))
        .catch((err: any) => {
          err?.response?.status === 401 && dispatchLogOut();
          if (handleErrorResponse) {
            if (err.response?.data?.errors) {
              err.response.data.errors.forEach((error: any) => handleErrorResponse(error.message));
              return;
            }
            handleErrorResponse(err.message || err);
          }
          err.response?.data?.errors && setError(err.response.data.errors);
          setError(err.message || err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [authState.isLoggedIn, authState.token, dispatchLogOut]
  );
  return {
    apiRequest,
    isLoading,
    error,
    setError,
  };
};
