import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as OAuth from 'oauth';

@Injectable()
export class YahooApiService {
  constructor(private readonly configService: ConfigService) {}
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

  getAuthorizationUrl(redirectUri: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.oauth.getOAuthRequestToken(
        { oauth_callback: redirectUri },
        (err, token, tokenSecret, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(`${this.yahooApiUrl}/oauth2/request_auth?oauth_token=${token}`);
          }
        }
      );
    });
  }
  
  exchangeAuthorizationCode(
    code: string,
    redirectUri: string,
  ): Promise<{ accessToken: string; accessTokenSecret: string }> {
    // Wrap the callback-based operation in a Promise
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
        },
      );
    });
  }
}
