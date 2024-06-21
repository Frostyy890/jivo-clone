import { Request, Response, NextFunction } from "express";
import { CustomError, HttpStatusCodes } from "../helpers/HttpException";

const ErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof CustomError) {
    const { statusCode, errors } = err;
    return res.status(statusCode).send({
      errors: errors.map((error) => {
        return { message: error };
      }),
    });
  }
  console.error("Unhandled error:", err);
  return res
    .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
    .send({ errors: [{ message: "Internal server error" }] });
};
export default ErrorHandler;
