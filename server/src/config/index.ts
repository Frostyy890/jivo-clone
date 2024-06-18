import dotenv from "dotenv";
import { z } from "zod";
import { CookieOptions } from "express";

dotenv.config();

const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "none",
  maxAge: 24 * 60 * 60 * 1000,
  secure: process.env.NODE_ENV === "production",
};

const configurationSchema = z.object({
  app: z.object({
    port: z.number().default(3000),
    env: z.enum(["production", "development", "test"]),
    productionUrl: z.string().url(),
  }),
  db: z.object({
    host: z.string(),
    port: z.number(),
    username: z.string(),
    password: z.string(),
    database: z.string(),
  }),
  hash: z.object({
    saltRounds: z.number().default(10),
  }),
  tokens: z.object({
    accessToken: z.object({
      secret: z.string(),
      expiry: z.string(),
      tokenType: z.string(),
    }),
    refreshToken: z.object({
      secret: z.string(),
      expiry: z.string(),
      cookieOptions: z.object({}),
    }),
  }),
});

export type Configuration = z.infer<typeof configurationSchema>;

const configuration: Configuration = {
  app: {
    port: Number.parseInt(process.env.PORT ?? "3000"),
    env: process.env.NODE_ENV as "production" | "development" | "test",
    productionUrl: process.env.PROD_URL || "",
  },
  db: {
    host: process.env.DB_HOST || "",
    port: Number.parseInt(process.env.DB_PORT || ""),
    username: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "",
  },
  hash: {
    saltRounds: Number.parseInt(process.env.SALT_ROUNDS || "10"),
  },
  tokens: {
    accessToken: {
      secret: process.env.ACCESS_TOKEN_SECRET || "access_token_secret",
      expiry: process.env.ACCESS_TOKEN_EXPIRY || "60s",
      tokenType: process.env.TOKEN_TYPE || "Bearer",
    },
    refreshToken: {
      secret: process.env.REFRESH_TOKEN_SECRET || "refresh_token_secret",
      expiry: process.env.REFRESH_TOKEN_EXPIRY || "1d",
      cookieOptions,
    },
  },
};

export default configuration;
