import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from '../users/schemas/users.schema';
import { YahooApiService } from 'src/yahoo-api/yahoo-api.service';

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

  async logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
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
        'https://pay-n-roll.vercel.app/home',
      );

      // Fetch additional data from Yahoo Fantasy API
      const games = await this.yahooApiService.fetchYahooGameData(yahooTokens.accessToken);

      // Now you can use the 'games' data as needed

      // Optionally, you can associate Yahoo tokens and data with the current user
      // Save yahooTokens and games to the user's profile or database record

      // Redirect or respond as needed
      response.redirect('https://pay-n-roll.vercel.app/home');
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  }

  // ... (other methods)
}
