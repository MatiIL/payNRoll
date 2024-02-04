// yahoo-api.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as OAuth from 'oauth';

@Injectable()
export class YahooApiService {
  private readonly yahooApiUrl = 'https://api.login.yahoo.com';

  private readonly oauth = new OAuth.OAuth(
    `${this.yahooApiUrl}/oauth/v2/request_auth`,
    `${this.yahooApiUrl}/oauth/v2/get_token`,
    this.configService.get<string>('YAHOO_CLIENT_ID'),
    this.configService.get<string>('YAHOO_CLIENT_SECRET'),
    '1.0',
    'https://pay-n-roll.vercel.app/home/auth/yahoo/callback',
    'HMAC-SHA1',
  );

  constructor(private readonly configService: ConfigService) {}

  async exchangeAuthorizationCode(code: string, redirectUri: string): Promise<any> {
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

  async fetchYahooGameData(accessToken: string): Promise<any> {
    try {
      // Example: Fetching games using the Yahoo Fantasy API
      // Replace this with the actual endpoint you want to hit
      const games = await this.api(
        'GET', 
        'https://fantasysports.yahooapis.com/fantasy/v2/league/4731/', 
        accessToken);

      console.log(games)

      return games;
    } catch (error) {
      console.error('Error in fetchYahooGameData:', error);
      throw new Error('Failed to fetch Yahoo Fantasy data');
    }
  }

  // ... (other methods)

  private async api(method: string, url: string, accessToken: string, postData?: any): Promise<any> {
    // Implement the logic to make authenticated requests to the Yahoo Fantasy API
    // This could involve making HTTP requests using a library like axios

    // Example using axios:
    // const response = await axios[method.toLowerCase()](`https://fantasysports.yahooapis.com${url}`, {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    //   data: postData,
    // });

    // return response.data;

    // Adjust the implementation based on your actual requirements and the library you use
  }
}
