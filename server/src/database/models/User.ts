import { db } from "..";
import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";
import { compare } from "bcrypt";

export enum Role {
  USER = "user",
  ADMIN = "admin",
  SUPERADMIN = "superadmin",
}

interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  roles?: Role[];
  refreshToken?: string;
}

export interface UserCreationAttributes extends Optional<IUser, "id"> {}
export type UserAttribute = Partial<UserCreationAttributes>;
export type UserUpdateAttributes = Omit<UserAttribute, "id">;

export default class User extends Model<IUser, UserCreationAttributes> implements IUser {
  declare id: string;
  declare username: string;
  declare email: string;
  declare password: string;
  declare roles: Role[];
  declare refreshToken: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  async verifyPassword(password: string) {
    return compare(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roles: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: ["user"],
    },
    refreshToken: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
  },
  { timestamps: true, sequelize: db, modelName: "User", tableName: "User" }
);
