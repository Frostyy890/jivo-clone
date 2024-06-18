import User, { Role, UserCreationAttributes, UserUpdateAttributes } from "../database/models/User";
import { Exclude, Expose, Transform, plainToInstance } from "class-transformer";
import configuration from "../../../config";
import { hashSync } from "bcrypt";

export default class UserDto implements UserCreationAttributes {
  @Expose()
  declare id: string;
  @Expose()
  declare username: string;
  @Expose()
  declare email: string;
  @Exclude()
  declare password: string;
  @Exclude()
  declare roles: Role[];
  @Exclude()
  declare refreshToken: string;
  @Exclude()
  declare createdAt: Date;
  @Exclude()
  declare updatedAt: Date;
}

export class CreateUserDto implements UserCreationAttributes {
  declare username: string;
  declare email: string;
  declare roles?: Role[];
  @Transform(({ value }: { value: string }) => hashSync(value, configuration.hash.saltRounds))
  declare password: string;
  declare refreshToken?: string;
}

export class UpdateUserDto implements UserUpdateAttributes {
  username?: string;
  email?: string;
  roles?: Role[];
  @Transform(({ value }: { value: string }) => hashSync(value, configuration.hash.saltRounds))
  password?: string;
  refreshToken?: string;
}

export const mapUserOutput = (data: User | User[]) => {
  return plainToInstance(UserDto, data, { excludeExtraneousValues: true });
};
