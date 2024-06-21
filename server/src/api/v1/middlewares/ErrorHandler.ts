import { Request, Response, NextFunction } from "express";
import { CustomError, HttpStatusCodes } from "../helpers/HttpException";
import { ValidationError } from "sequelize";

const ErrorFactory = (err: Error, res: Response) => {
  if (err instanceof CustomError) {
    const { statusCode, errors } = err;
    return res.status(statusCode).send({
      errors: errors.map((error) => {
        return { message: error };
      }),
    });
  }
  if (err instanceof ValidationError) {
    return res.status(HttpStatusCodes.BAD_REQUEST).send({
      errors: [{ message: err.message }],
    });
  }
  return null;
};

const ErrorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const handledError = ErrorFactory(err, res);
  if (handledError) return handledError;
  console.error("Unhandled error:", JSON.stringify(err, null, 2));
  return res
    .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
    .send({ errors: [{ message: "Internal server error" }] });
};
export default ErrorHandler;
