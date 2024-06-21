import { sign, verify, type JwtPayload } from "jsonwebtoken";
import configuration from "../../../config";
import HttpException, { HttpStatusCodes } from "../helpers/HttpException";

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export default class {
  generateAuthTokens(payload: object): AuthTokens {
    const { accessToken, refreshToken } = configuration.tokens;
    return {
      accessToken: sign(payload, accessToken.secret, {
        expiresIn: accessToken.expiry,
      }),
      refreshToken: sign(payload, refreshToken.secret, {
        expiresIn: refreshToken.expiry,
      }),
    };
  }
  async verifyToken(token: string, secret: string): Promise<JwtPayload> {
    return await new Promise((resolve, reject) => {
      verify(token, secret, (err, decoded) => {
        if (err) reject(new HttpException(HttpStatusCodes.FORBIDDEN));
        else resolve(decoded as JwtPayload);
      });
    });
  }
}
