import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import configuration from "./config";
import { corsOptions } from "./config/CORS";
import cookieParser from "cookie-parser";
import appRoutes from "./api/v1/routes";
import initializeSocket from "./ws";
import { connectToDB } from "./database";
import { ErrorHandler } from "./api/v1/middlewares";
import HttpException, { HttpStatusCodes } from "./api/v1/helpers/HttpException";
import { Logger } from "./api/v1/middlewares/Logger";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(Logger);

app.use("/api/v1", appRoutes);

//Handling not existing routes
app.use((_req: Request, _res: Response, _next: NextFunction) => {
  throw new HttpException(HttpStatusCodes.NOT_FOUND, "Route not found");
});

app.use(ErrorHandler);

const initializeApp = async () => {
  try {
    const { port } = configuration.app;
    const expressServer = app.listen(port, () =>
      console.log(`[server] started at http://localhost:${port}`)
    );
    initializeSocket(expressServer);
    connectToDB();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

initializeApp();
