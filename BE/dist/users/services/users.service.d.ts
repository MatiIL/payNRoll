import { User } from "../schemas/users.schema";
import { Model } from "mongoose";
import { CreateUserInput } from "../inputs/create-user.input";
export declare class UserService {
    private usersModel;
    constructor(usersModel: Model<User>);
    createUser(user: CreateUserInput): Promise<User>;
}
