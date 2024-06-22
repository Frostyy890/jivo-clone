import type { CorsOptions } from "cors";
import HttpException, { HttpStatusCodes } from "../api/v1/helpers/HttpException";
export const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new HttpException(HttpStatusCodes.FORBIDDEN, "Not allowed by CORS"));
    }
  },
  methods: "GET, POST, PATCH, PUT, DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};
