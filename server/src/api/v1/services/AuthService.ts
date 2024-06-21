import UserService from "./UserService";
import TokenService from "./TokenService";
import { IAuthService } from "../interfaces";
import { LoginUserData, RegisterUserData } from "../validations/UserValidations";
import configuration from "../../../config";
import HttpException, { HttpStatusCodes } from "../helpers/HttpException";

export default class implements IAuthService {
  private readonly userService: UserService;
  private readonly tokenService: TokenService;
  constructor() {
    this.userService = new UserService();
    this.tokenService = new TokenService();
  }
  async register(data: RegisterUserData) {
    const newUser = await this.userService.create(data);
    const { accessToken, refreshToken } = this.tokenService.generateAuthTokens({
      email: newUser.email,
      roles: newUser.roles,
    });
    await this.userService.update(newUser.id, { refreshToken });
    return { accessToken, refreshToken };
  }
  async login(data: LoginUserData) {
    const user = await this.userService.findOne({ email: data.email });
    if (!user || !(await user.verifyPassword(data.password)))
      throw new HttpException(HttpStatusCodes.BAD_REQUEST, "Wrong credentials");
    const { accessToken, refreshToken } = this.tokenService.generateAuthTokens({
      email: user.email,
      roles: user.roles,
    });
    await this.userService.update(user.id, { refreshToken });
    return { accessToken, refreshToken };
  }
  async refresh(refreshToken: string): Promise<string> {
    const user = await this.userService.findOne({ refreshToken });
    if (!user) throw new HttpException(HttpStatusCodes.FORBIDDEN);
    const decoded = await this.tokenService.verifyToken(
      refreshToken,
      configuration.tokens.refreshToken.secret
    );
    const isRolesMatch = user.roles.every((role) => decoded.roles.includes(role));
    if (decoded.email !== user.email || !isRolesMatch)
      throw new HttpException(HttpStatusCodes.FORBIDDEN);
    const { accessToken } = this.tokenService.generateAuthTokens({
      email: user.email,
      roles: user.roles,
    });
    return accessToken;
  }
  async logout(refreshToken: string) {
    const user = await this.userService.findOne({ refreshToken });
    if (user) await this.userService.update(user.id, { refreshToken: "" });
    return;
  }
}
