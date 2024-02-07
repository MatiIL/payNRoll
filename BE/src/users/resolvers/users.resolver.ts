import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GetUserArgs } from '../dtos/args/get-user-args.dto';
import { User } from '../schemas/users.schema';
import { UserService } from '../services/users.service';
import { CreateUserInput } from '../inputs/create-user.input';
import { SignupResponse } from '../dtos/signup-response.dto';
import { ObjectId } from 'mongodb';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async addNewUser(
    @Args('user') user: CreateUserInput,
  ): Promise<SignupResponse> {
    try {
      const newUser = await this.userService.createUser(user);

      return {
        success: true,
        userId: newUser._id,
        firstName: newUser.firstName,
        teamName: newUser.teamName,
      };
    } catch (error) {
      console.error('Error creating new user:', error);
      throw error;
    }
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User, { name: 'user' })
  async getUser(@Args() getUserArgs: GetUserArgs) {
    return this.userService.getUser(getUserArgs);
  }

  // @UseGuards(GqlAuthGuard)
  @Query(() => [User], { name: 'allUsers' }) 
  async getAllUsers() {
    return this.userService.findAllUsers();
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('userId') userId: string): Promise<boolean> {
    try {
      const isDeleted = await this.userService.deleteUser(userId);
      return isDeleted;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }
}
