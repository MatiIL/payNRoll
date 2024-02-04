import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class YahooApiService {

  constructor(
    private readonly configService: ConfigService
  ) {}

  initiateAuthentication(response: any): void {
    const authData = {
      client_id: this.configService.get<string>('YAHOO_CLIENT_ID'),
      redirect_uri: 'https://pay-n-roll.vercel.app/home',
      response_type: 'code',
      language: 'en-us',
    };

    const queryString = Object.entries(authData)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    const authUrl = `https://api.login.yahoo.com/oauth2/request_auth?${queryString}`;

    response.redirect(authUrl);
  }

  // Add more methods as needed for handling authentication callback, fetching tokens, etc.
}