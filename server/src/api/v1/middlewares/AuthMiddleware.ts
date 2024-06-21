import type { Response, NextFunction } from "express";
import { IAuthMiddleware, IAuthRequest } from "../interfaces";
import configuration from "../../../config";
import { TokenService } from "../services";
import { Role } from "../../../database/models/User";
import { getPermissions } from "../../../config/Permissions";
import HttpException, { HttpStatusCodes } from "../helpers/HttpException";

export default class implements IAuthMiddleware {
  private readonly tokenService: TokenService;
  constructor() {
    this.tokenService = new TokenService();
    this.verifyToken = this.verifyToken.bind(this);
  }
  async verifyToken(req: IAuthRequest, _res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) throw new HttpException(HttpStatusCodes.UNAUTHORIZED);
    const [type, token] = authorization.split(" ");
    const { secret, tokenType } = configuration.tokens.accessToken;
    if (type !== tokenType) throw new HttpException(HttpStatusCodes.UNAUTHORIZED);
    const { email, roles } = await this.tokenService.verifyToken(token, secret);
    req.user = { email, roles };
    next();
  }
  verifyRoles(allowedRoles: Role[]) {
    return (req: IAuthRequest, _res: Response, next: NextFunction) => {
      if (!req.user || !req.user?.roles) throw new HttpException(HttpStatusCodes.FORBIDDEN);
      const isRolesMatch = req.user.roles.some((role) => allowedRoles.includes(role));
      if (!isRolesMatch) throw new HttpException(HttpStatusCodes.FORBIDDEN);
      next();
    };
  }
  verifyPermission(permission: string) {
    return (req: IAuthRequest, _res: Response, next: NextFunction) => {
      if (!req.user || !req.user?.roles) throw new HttpException(HttpStatusCodes.FORBIDDEN);
      const userPermissions = getPermissions(req.user.roles);
      if (!userPermissions || !userPermissions.includes(permission))
        throw new HttpException(HttpStatusCodes.FORBIDDEN, `Forbidden to ${permission}`);
      next();
    };
  }
}
