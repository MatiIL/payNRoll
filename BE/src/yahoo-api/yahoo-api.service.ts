import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const YahooFantasy = require('yahoo-fantasy');

@Injectable()
export class YahooApiService {
  private readonly yf: any; // Type based on the Yahoo Fantasy library

  constructor(private readonly configService: ConfigService) {
    // Initialize YahooFantasy instance with your application key and secret
    this.yf = new YahooFantasy(
      this.configService.get<string>('YAHOO_CLIENT_ID'),
      this.configService.get<string>('YAHOO_CLIENT_SECRET'),
      this.tokenCallbackFunction, // Implement this function or remove it if not needed
      'https://pay-n-roll.vercel.app/home/auth/yahoo/callback'
    );
  }

  // Implement this function or remove it if not needed
  private tokenCallbackFunction(response: any) {
    console.log(response)
  }

  auth(response: any): void {
    // Check if the response is already sent before redirecting
    if (!response.headersSent) {
      this.yf.auth(response);
    }
  }

  // Callback method to handle the authentication callback from Yahoo
  authCallback(request: any, callback: any): void {
    this.yf.authCallback(request, callback);
  }

  // Example method to get data from Yahoo Fantasy API after authentication
  async fetchData(): Promise<any> {
    try {
      // Replace 'league_key' with the actual league key you want to fetch data from
      const data = await this.yf.league('league_key').meta();

      // You can perform additional processing on 'data' as needed
      return data;
    } catch (error) {
      console.error('Error fetching data from Yahoo Fantasy API:', error);
      throw new Error('Failed to fetch data from Yahoo Fantasy API');
    }
  }
}
