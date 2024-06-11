import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const configurationSchema = z.object({
  app: z.object({
    port: z.number().default(3000),
    env: z.enum(["production", "development", "test"]),
    productionUrl: z.string().url(),
  }),
});

export type Configuration = z.infer<typeof configurationSchema>;

const configuration: Configuration = {
  app: {
    port: Number.parseInt(process.env.PORT ?? "3000"),
    env: process.env.NODE_ENV as "production" | "development" | "test",
    productionUrl: process.env.PROD_URL || "",
  },
};

export default configuration;
