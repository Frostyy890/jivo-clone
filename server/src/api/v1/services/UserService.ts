import type { IUserService } from "../interfaces";
import type {
  UserAttribute,
  UserUpdateAttributes,
  UserCreationAttributes,
} from "../../../database/models/User";
import { UserRepository } from "../repositories";
import { plainToInstance } from "class-transformer";
import { CreateUserDto, UpdateUserDto } from "../dto";
import HttpException, { HttpStatusCodes } from "../helpers/HttpException";
import User from "../../../database/models/User";

export default class implements IUserService {
  private readonly userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  async findAll() {
    return await this.userRepository.findAll();
  }
  async findOne(where: UserAttribute) {
    return await this.userRepository.findOne(where);
  }
  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ id });
    if (!user) throw new HttpException(HttpStatusCodes.NOT_FOUND, "User not found");
    return user;
  }

  async create(data: UserCreationAttributes) {
    const transformedData = plainToInstance(CreateUserDto, data);
    return await this.userRepository.create(transformedData);
  }
  async update(id: string, data: UserUpdateAttributes) {
    await this.findById(id);
    const transformedData = plainToInstance(UpdateUserDto, data);
    return await this.userRepository.update({ id }, transformedData);
  }
  async delete(id: string) {
    await this.findById(id);
    return await this.userRepository.delete({ id });
  }
}
