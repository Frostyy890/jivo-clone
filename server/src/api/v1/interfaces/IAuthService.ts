import { AuthTokens } from "../services/TokenService";
import { LoginUserData, RegisterUserData } from "../validations/UserValidations";
import User from "../../../database/models/User";

export interface IAuthService {
  register(data: RegisterUserData): Promise<{ tokens: AuthTokens; user: User }>;
  login(data: LoginUserData): Promise<{ tokens: AuthTokens; user: User }>;
  refresh(refreshToken: string): Promise<string>;
  logout(refreshToken: string): Promise<void>;
}
