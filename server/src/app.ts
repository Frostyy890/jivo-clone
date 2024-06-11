import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import configuration from "./config/AppConfig";
import initializeSocket from "./ws";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Handling not existing routes
app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({ error: "Not found" });
});

const initializeApp = async () => {
  try {
    const { port } = configuration.app;
    const expressServer = app.listen(port, () =>
      console.log(`[server]: started at http://localhost:${port}`)
    );
    initializeSocket(expressServer);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

initializeApp();
