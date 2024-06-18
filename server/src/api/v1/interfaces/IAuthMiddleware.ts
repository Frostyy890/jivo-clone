import type { Request, Response, NextFunction } from "express";
import { Role } from "../database/models/User";

export interface IAuthRequest extends Request {
  user?: { email: string; roles: Role[] };
}
export interface IAuthMiddleware {
  verifyToken(req: IAuthRequest, res: Response, next: NextFunction): Promise<void>;
  verifyRoles(allowedRoles: Role[]): (req: IAuthRequest, res: Response, next: NextFunction) => void;
  verifyPermission(
    permission: string
  ): (req: IAuthRequest, res: Response, next: NextFunction) => void;
}
