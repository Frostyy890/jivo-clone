import type { Response, NextFunction } from "express";
import { IAuthMiddleware, IAuthRequest } from "../interfaces";
import configuration from "../../../config";
import { TokenService } from "../services";
import { Role } from "../database/models/User";
import { getPermissions } from "../../../config/Permissions";

export default class implements IAuthMiddleware {
  private readonly tokenService: TokenService;
  constructor() {
    this.tokenService = new TokenService();
    this.verifyToken = this.verifyToken.bind(this);
  }
  async verifyToken(req: IAuthRequest, _res: Response, next: NextFunction) {
    try {
      const { authorization } = req.headers;
      if (!authorization) throw new Error("Unauthorized");
      const [type, token] = authorization.split(" ");
      const { secret, tokenType } = configuration.tokens.accessToken;
      if (type !== tokenType) throw new Error("Unauthorized");
      const { email, roles } = await this.tokenService.verifyToken(token, secret);
      req.user = { email, roles };
      next();
    } catch (error) {
      next(error);
    }
  }
  verifyRoles(allowedRoles: Role[]) {
    return (req: IAuthRequest, _res: Response, next: NextFunction) => {
      if (!req.user || !req.user?.roles) throw new Error("Forbidden");
      const isRolesMatch = req.user.roles.some((role) => allowedRoles.includes(role));
      if (!isRolesMatch) throw new Error("Forbidden");
      next();
    };
  }
  verifyPermission(permission: string) {
    return (req: IAuthRequest, _res: Response, next: NextFunction) => {
      if (!req.user || !req.user?.roles) throw new Error("Forbidden");
      const userPermissions = getPermissions(req.user.roles);
      if (!userPermissions || !userPermissions.includes(permission))
        throw new Error(`Forbidden to ${permission}`);
      next();
    };
  }
}
