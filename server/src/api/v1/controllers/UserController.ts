import type { IUserController } from "../interfaces";
import type { Request, Response, NextFunction } from "express";
import { UserService } from "../services";
import { mapUserOutput } from "../dto";
import { HttpStatusCodes } from "../helpers/HttpException";

export default class implements IUserController {
  private readonly userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  async findAll(_req: Request, res: Response, _next: NextFunction): Promise<void> {
    const users = await this.userService.findAll();
    res.status(HttpStatusCodes.OK).send(mapUserOutput(users));
  }
  async findById(req: Request, res: Response, _next: NextFunction): Promise<void> {
    const user = await this.userService.findById(req.params.id);
    res.status(HttpStatusCodes.OK).send(mapUserOutput(user));
  }
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const user = await this.userService.create(req.body);
    res.status(HttpStatusCodes.CREATED).send(mapUserOutput(user));
  }
  async update(req: Request, res: Response, _next: NextFunction): Promise<void> {
    await this.userService.update(req.params.id, req.body);
    res.sendStatus(HttpStatusCodes.OK);
  }
  async delete(req: Request, res: Response, _next: NextFunction): Promise<void> {
    await this.userService.delete(req.params.id);
    res.sendStatus(HttpStatusCodes.OK);
  }
}
