import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services";
import { HttpStatusCodes } from "../helpers/HttpException";
import configuration from "../../../config";
import { IAuthController } from "../interfaces";
import { mapUserOutput } from "../dto";

export default class implements IAuthController {
  private readonly authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }
  async register(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { tokens, user } = await this.authService.register(req.body);
    const { accessToken, refreshToken } = tokens;
    res
      .cookie("rf_tkn", refreshToken, configuration.tokens.refreshToken.cookieOptions)
      .status(HttpStatusCodes.OK)
      .json({ token: accessToken, user: mapUserOutput(user), success: true });
  }
  async login(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const { tokens, user } = await this.authService.login(req.body);
    const { accessToken, refreshToken } = tokens;
    res
      .cookie("rf_tkn", refreshToken, configuration.tokens.refreshToken.cookieOptions)
      .status(HttpStatusCodes.OK)
      .json({ token: accessToken, user: mapUserOutput(user), success: true });
  }
  async refresh(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const accessToken = await this.authService.refresh(req.cookies["rf_tkn"]);
    res.status(HttpStatusCodes.OK).send({ accessToken });
  }
  async logout(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const refreshToken = req.cookies["rf_tkn"];
    if (!refreshToken) {
      res.sendStatus(HttpStatusCodes.NO_CONTENT);
      return;
    }
    await this.authService.logout(refreshToken);
    res
      .clearCookie("rf_tkn", configuration.tokens.refreshToken.cookieOptions)
      .sendStatus(HttpStatusCodes.NO_CONTENT);
  }
}
