import { Request, Response, NextFunction } from "express";
import { HttpStatusCodes } from "../helpers/HttpException";
const ErrorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(HttpStatusCodes.BAD_REQUEST).send({ errors: [{ message: err.message }] });
  }
  console.error("Unhandled error:", err);
  return res
    .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
    .send({ errors: [{ message: "Internal server error" }] });
};
export default ErrorHandler;
