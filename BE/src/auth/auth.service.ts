import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from '../users/schemas/users.schema';
import { YahooApiService } from '../yahoo-api/yahoo-api.service';

export interface TokenPayload {
  userId: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly yahooApiService: YahooApiService,
  ) {}

  async login(user: User, response: Response) {
    const tokenPayload = {
      userId: user.userId,
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }

  async yahooLogin(user: User, res: Response) {
    try {
      // Redirect the user to Yahoo for authentication
      this.yahooApiService.authenticate(res);
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  }

  async yahooCallback(
    oauthToken: string,
    oauthVerifier: string,
    user: User,
    response: Response,
  ) {
    try {
      // Exchange the authorization code for Yahoo access tokens
      const yahooTokens = await this.yahooApiService.exchangeAuthorizationCode(
        oauthVerifier,
        'https://pay-n-roll.vercel.app/home', // Replace with your actual callback URL
      );

      // Now you can use Yahoo access tokens (yahooTokens) as needed

      // Optionally, you can associate Yahoo tokens with the current user
      // Save yahooTokens to the user's profile or database record

      // Redirect or respond as needed
      response.redirect('https://pay-n-roll.vercel.app/home');
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  }

  async logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
}