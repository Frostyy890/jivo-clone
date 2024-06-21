import { Sequelize } from "sequelize-typescript";
import configuration from "../config";

export const db = new Sequelize({
  dialect: "postgres",
  ...configuration.db,
  logging: false,
});

export async function connectToDB() {
  try {
    await db.authenticate();
    await db.sync({ alter: true });
    console.log("[database] connected");
  } catch (err) {
    console.error("[database] failed to connect", err);
    await db.close();
    process.exit(1);
  }
}
