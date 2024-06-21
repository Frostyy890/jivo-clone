import User, {
  UserAttribute,
  UserCreationAttributes,
  UserUpdateAttributes,
} from "../../../database/models/User";
export interface IUserRepository {
  findAll(): Promise<User[]>;
  findOne(where: UserAttribute): Promise<User | null>;
  create(data: UserCreationAttributes): Promise<User>;
  update(where: UserAttribute, data: UserUpdateAttributes): Promise<[affectedCount: number]>;
  delete(where: UserAttribute): Promise<number>;
}
