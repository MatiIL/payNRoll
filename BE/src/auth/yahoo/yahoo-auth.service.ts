// yahoo-auth.service.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';
import { OAuthService } from '../o-auth/oauth-service';

@Injectable()
export class YahooAuthService extends PassportStrategy(Strategy, 'yahoo') {
  constructor(
    private readonly configService: ConfigService,
    private readonly oauthService: OAuthService,
  ) {
    super({
      authorizationURL: 'https://api.login.yahoo.com/oauth2/request_auth',
      tokenURL: 'https://api.login.yahoo.com/oauth2/get_token',
      clientID: configService.get<string>('YAHOO_CLIENT_ID'),
      clientSecret: configService.get<string>('YAHOO_CLIENT_SECRET'),
      callbackURL: 'https://your-callback-url', // Replace with your callback URL
    });
  }

  async validate(accessToken: string): Promise<any> {
    try {
      // Validate the user using the OAuthService
      const user = await this.oauthService.validateUser(accessToken);
      return user;
    } catch (error) {
      return null; // or handle the error as needed
    }
  }
}
