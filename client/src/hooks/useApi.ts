import { RootState } from "@/redux/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const baseUrl = import.meta.env.VITE_BASE_URL || "";
const tokenType = import.meta.env.VITE_TOKEN_TYPE || "Bearer";

const useApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) headers.set("Authorization", tokenType + " " + token);
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});

export default useApi;
