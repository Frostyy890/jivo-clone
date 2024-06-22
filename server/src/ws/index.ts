import { Server } from "socket.io";
import configuration from "../config";
import { allowedOrigins } from "../config/CORS";

const initializeSocket = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin:
        configuration.app.env === "production" ? configuration.app.productionUrl : allowedOrigins,
    },
  });

  io.on("connection", (socket): void => {
    const username = socket.id.substring(0, 6);
    console.log(`User ${username} connected!`);
    //Only to user
    socket.emit("message", "Welcome to chat app!");
    //To everyone else
    socket.broadcast.emit("message", `User ${username} has joined the chat`);

    socket.on("message", (message) => {
      console.log("Received:", message);
      io.emit("message", message);
    });

    socket.on("activity", (name) => {
      socket.broadcast.emit("activity", name);
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("message", `User ${username} has left the chat`);
    });
  });
};

export default initializeSocket;
