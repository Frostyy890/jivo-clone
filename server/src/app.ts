import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import appRoutes from "./api/v1/routes";
import configuration from "./config";
import initializeSocket from "./ws";
import { connectToDB } from "./api/v1/database";
import { ErrorHandler } from "./api/v1/middlewares";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", appRoutes);
app.use(ErrorHandler);

//Handling not existing routes
app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ error: "Not found" });
});

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
