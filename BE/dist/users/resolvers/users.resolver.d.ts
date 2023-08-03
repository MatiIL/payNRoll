import { User } from "../schemas/users.schema";
import { UserService } from "../services/users.service";
import { CreateUserInput } from "../inputs/create-user.input";
export declare class UserResolver {
    private readonly userService;
    constructor(userService: UserService);
    addNewUser(user: CreateUserInput): Promise<User>;
}
