import type { IUserRepository } from "../interfaces";
import User, {
  UserCreationAttributes,
  UserAttribute,
  UserUpdateAttributes,
} from "../../../database/models/User";

export default class implements IUserRepository {
  private readonly user;
  constructor() {
    this.user = User;
  }
  async findAll() {
    return await this.user.findAll();
  }
  async findOne(where: UserAttribute) {
    return await this.user.findOne({ where });
  }
  async create(data: UserCreationAttributes) {
    return await this.user.create(data);
  }
  async update(where: UserAttribute, data: UserUpdateAttributes) {
    return await this.user.update(data, { where });
  }
  async delete(where: UserAttribute) {
    return await this.user.destroy({ where });
  }
}
