import * as https from 'https';
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

  exchangeCodeForTokens(code: string): Promise<any> {
    const tokenData = {
      client_id: this.configService.get<string>('YAHOO_CLIENT_ID'),
      client_secret: this.configService.get<string>('YAHOO_CLIENT_SECRET'),
      redirect_uri: 'https://pay-n-roll.vercel.app/home',
      code,
      grant_type: 'authorization_code',
    };

    const formData = Object.entries(tokenData)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    return new Promise((resolve, reject) => {
      const req = https.request(
        `https://api.login.yahoo.com/oauth2/get_token`,
        { ...options },
        (res) => {
          let data = '';

          res.on('data', (chunk) => {
            data += chunk;
          });

          res.on('end', () => {
            try {
              resolve(JSON.parse(data));
            } catch (error) {
              reject(error);
            }
          });
        }
      );

      req.on('error', (error) => {
        reject(error);
      });

      req.write(formData);
      req.end();
    });
  }
}