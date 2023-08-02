import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { User } from "../schemas/users.schema";
import { UserService } from "../services/users.service";
import { CreateUserInput } from "../inputs/create-user.input";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async addNewUser(@Args("user") user: CreateUserInput): Promise<User> {
    return this.userService.createUser(user);
  }
}