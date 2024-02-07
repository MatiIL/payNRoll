import {
  Injectable,
  UnprocessableEntityException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../schemas/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from '../inputs/create-user.input';
import { GetUserArgs } from '../dtos/args/get-user-args.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private usersModel: Model<User>) {}

  async createUser(user: CreateUserInput): Promise<User> {
    await this.validateSignup(user);
    const newUserDoc = await this.usersModel.create({
      ...user,
      password: await bcrypt.hash(user.password, 12),
    });
    return newUserDoc;
  }

  private async validateSignup(userData: CreateUserInput) {
    try {
      await this.usersModel.findOne({ email: userData.email });
      throw new UnprocessableEntityException('Email already exists.');
    } catch (err) {}
  }

  async getUser(getUserArgs: GetUserArgs) {
    const userDoc = await this.usersModel.findOne(getUserArgs);
    return userDoc;
  }

  async findAllUsers(): Promise<User[]> {
    return this.usersModel.find().exec();
  }

  async validateLogin(email: string, password: string) {
    const userDoc = await this.usersModel.findOne({ email });
    if (!userDoc) {
      throw new UnauthorizedException('User with this email does not exist.');
    }
    const isPassValid = await bcrypt.compare(password, userDoc.password);
    if (!isPassValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    const { userId, firstName, teamName, isAdmin } = userDoc;
    return { userId, firstName, teamName, isAdmin };
  }

  async deleteUser(userId: string): Promise<boolean> {
    try {
      const user = await this.usersModel.findById(userId);
      if (!user) return false;
      await this.usersModel.deleteOne({ _id: userId });
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }
}
