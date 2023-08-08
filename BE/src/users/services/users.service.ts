import { Injectable } from "@nestjs/common";
import { User } from "../schemas/users.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateUserInput } from "../inputs/create-user.input";


@Injectable()
export class UserService {

    constructor(@InjectModel('users') private usersModel: Model<User>) {}

    async createUser(user: CreateUserInput): Promise<User> {
        return await this.usersModel.create(user);
    }
}