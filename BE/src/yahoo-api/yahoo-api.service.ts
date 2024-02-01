import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import * as OAuth from 'oauth';
import YahooFantasy = require("yahoo-fantasy");

@Injectable()
export class YahooApiService {
  private readonly yahooFantasy: YahooFantasy;
  private readonly yahooApiUrl = 'https://api.login.yahoo.com';

  private readonly oauth = new OAuth.OAuth(
    `${this.yahooApiUrl}/oauth2/request_auth`,
    `${this.yahooApiUrl}/oauth2/get_token`,
    this.configService.get<string>('YAHOO_CLIENT_ID'),
    this.configService.get<string>('YAHOO_CLIENT_SECRET'),
    '1.0',
    'https://pay-n-roll.vercel.app/home',
    'HMAC-SHA1',
  );

  constructor(private readonly configService: ConfigService) {
    const yahooFantasyOptions = {
      consumerKey: this.configService.get<string>('YAHOO_CLIENT_ID'),
      consumerSecret: this.configService.get<string>('YAHOO_CLIENT_SECRET'),
      tokenCallbackFn: this.refreshTokenCallback,
      redirectUri: 'https://pay-n-roll.vercel.app/home',
    };
  
    this.yahooFantasy = new YahooFantasy(yahooFantasyOptions);
  }

  private async refreshTokenCallback(tokenData: any) {
    // Handle token refresh logic, if needed
  }

  authenticate(res: Response): void {
    // Redirect user to Yahoo for authentication
    this.yahooFantasy.auth(res);
  }
  
  async handleCallback(req: { query: { code: string; state: string } }) {
    try {
      // Handle Yahoo callback after user authentication
      // This method should be called when your redirect URI is hit by Yahoo after authentication
  
      // Use the asynchronous version of authCallback
      const tokenData = await this.yahooFantasy.authCallback(req);
  
      // Handle the callback logic here
      // For example, you can log the data
      console.log('Callback Data:', tokenData);
  
      // Use tokenData to make authenticated requests to the Yahoo Fantasy API
      const games = await this.yahooFantasy.api('GET', '/users/games', tokenData.access_token);
      // Perform other API requests as needed
  
      return games;
    } catch (error) {
      // Handle errors here
      console.error('Error in handleCallback:', error);
      throw new Error('Internal Server Error');
    }
  }
  

  exchangeAuthorizationCode(code: string, redirectUri: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.oauth.getOAuthAccessToken(
        code,
        null,
        null,
        (err, accessToken, accessTokenSecret, results) => {
          if (err) {
            reject(err);
          } else {
            resolve({ accessToken, accessTokenSecret });
          }
        }
      );
    });
  }
}