import express from "express";
import cookieParser from "cookie-parser";
import configuration from "./config/AppConfig";
import initializeSocket from "./ws";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
