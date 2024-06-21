import { AuthTokens } from "../services/TokenService";
import { LoginUserData, RegisterUserData } from "../validations/UserValidations";

export interface IAuthService {
  register(data: RegisterUserData): Promise<AuthTokens>;
  login(data: LoginUserData): Promise<AuthTokens>;
  refresh(refreshToken: string): Promise<string>;
  logout(refreshToken: string): Promise<void>;
}
