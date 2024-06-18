import User, {
  UserAttribute,
  UserUpdateAttributes,
  UserCreationAttributes,
} from "../database/models/User";
export interface IUserService {
  findAll(): Promise<User[]>;
  findOne(where: UserAttribute): Promise<User | null>;
  findById(id: string): Promise<User>;
  create(data: UserCreationAttributes): Promise<User>;
  update(where: UserAttribute, data: UserUpdateAttributes): Promise<[affectedCount: number]>;
  delete(where: UserAttribute): Promise<number>;
}
