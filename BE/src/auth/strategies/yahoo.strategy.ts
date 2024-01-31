import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class YahooStrategy extends PassportStrategy(Strategy, 'yahoo') {
  constructor(private readonly configService: ConfigService) {
    super({
      authorizationURL: 'https://api.login.yahoo.com/oauth2/request_auth',
      tokenURL: 'https://api.login.yahoo.com/oauth2/get_token',
      clientID: configService.get<string>('YAHOO_CLIENT_ID'),
      clientSecret: configService.get<string>('YAHOO_CLIENT_SECRET'),
      callbackURL: 'https://pay-n-roll.vercel.app/home'
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    try {
      // You can use the accessToken to make requests to Yahoo API
      // Adjust this based on the information you need

      // You might want to store the accessToken and refreshToken in your database
      // for later use when making requests to Yahoo API

      return done(null, {
        // yahooId: profile.id,
        // email: profile.emails[0].value,
        accessToken, // You might want to pass the accessToken to the frontend
      });
    } catch (error) {
      return done(error, false);
    }
  }

  async authorizationCallback(accessToken: string, refreshToken: string, params: any, profile: any): Promise<any> {
    try {
      // Handle the token exchange here if you need to
      // accessToken and refreshToken are available here

      return {
        profile,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
