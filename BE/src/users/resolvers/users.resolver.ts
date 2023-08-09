import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "src/auth/guards/gql-auth.guard";
import { GetUserArgs } from "../dtos/args/get-user-args.dto"
import { User } from "../schemas/users.schema";
import { UserService } from "../services/users.service";
import { CreateUserInput } from "../inputs/create-user.input";
import { SignupResponse } from "../dtos/signup-response.dto";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
async addNewUser(@Args('user') user: CreateUserInput): Promise<SignupResponse> {
  console.log('Received user input:', user);

  try {
    const newUser = await this.userService.createUser(user);
    console.log('New user created:', newUser);

    return {
      success: true,
      userId: newUser._id,
      firstName: newUser.firstName,
      teamName: newUser.teamName,
    };
  } catch (error) {
    console.error('Error creating new user:', error);
    throw error; // Rethrow the error to propagate it to the client
  }
}

@UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  async getUser(@Args() getUserArgs: GetUserArgs) {
    return this.userService.getUser(getUserArgs);
  }

}