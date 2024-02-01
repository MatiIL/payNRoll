import { Controller, Get, Query, Res, Redirect } from '@nestjs/common';
import { Response } from 'express';
import { YahooApiService } from './yahoo-api.service';

@Controller('yahoo-api')
export class YahooController {
  constructor(private readonly yahooApiService: YahooApiService) {}

  @Get('authenticate')
@Redirect()
async authenticate(@Res() res: Response): Promise<string> {
  try {
    // Get the authorization URL and redirect the user to Yahoo for authentication
    const redirectUri = 'https://pay-n-roll.vercel.app/home'; // Set your app's callback URL here
    const authorizationUrl = await this.yahooApiService.getAuthorizationUrl(redirectUri);

    return authorizationUrl;
  } catch (error) {
    throw new Error('Internal Server Error');
  }
}

  @Get('callback')
  async callback(@Query('oauth_token') oauthToken: string, @Query('oauth_verifier') oauthVerifier: string): Promise<any> {
    try {
      // Exchange the authorization code for an access token
      const redirectUri = 'https://pay-n-roll.vercel.app/home'; // Set your app's callback URL here
      const result = await this.yahooApiService.exchangeAuthorizationCode(oauthVerifier, redirectUri);

      // The result object now contains the accessToken and accessTokenSecret
      // You can use these to make authenticated requests to the Yahoo API

      return result;
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  }
}