import React from "react";
import { IAuthPayload } from "@/store/auth/AuthActions";
import { AuthContext } from "@/store/auth/AuthContext";

export interface IAuthData extends IAuthPayload {
  success: boolean;
}

export type ApiRequestProps = {
  endpoint: string;
  params: { [key: string]: any };
  handleSuccessResponse: (data: any) => void;
  handleErrorResponse?: (data: Error) => void;
};

const BASE_URL = process.env.BASE_URL || "";
const TOKEN_TYPE = process.env.TOKEN_TYPE || "Bearer";

export const useApi = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { authState, dispatchLogOut } = React.useContext(AuthContext);

  const apiRequest = React.useCallback(
    async ({ endpoint, params, handleSuccessResponse, handleErrorResponse }: ApiRequestProps) => {
      setIsLoading(true);
      setError(null);
      try {
        if (authState.isLoggedIn)
          params.headers["Authorization"] = `${TOKEN_TYPE} ${authState.token}`;
        const res = await fetch(BASE_URL + endpoint, { ...params });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error);
        }
        const data = await res.json();
      } catch (error) {}
    },
    [authState.isLoggedIn, authState.token, authState.user]
  );
};
