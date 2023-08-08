import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { User } from "../schemas/users.schema";
import { UserService } from "../services/users.service";
import { CreateUserInput } from "../inputs/create-user.input";
import { SignupResponse } from "../dtos/signup-response.dto";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async addNewUser(@Args('user') user: CreateUserInput): Promise<SignupResponse> {
    const newUser = await this.userService.createUser(user);
    return {
      success: true,
      userId: newUser._id,
      firstName: newUser.firstName,
      teamName: newUser.teamName
    };
  }

}