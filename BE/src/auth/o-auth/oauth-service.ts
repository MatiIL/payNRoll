// oauth.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthService {
  // Add any methods you need for handling OAuth-related tasks

  async validateUser(accessToken: string): Promise<any> {
    // Implement logic to validate the user based on the access token
    // For example, you may make a request to the Yahoo API using the accessToken
    // and retrieve user details
    const user = await this.getUserDetailsFromYahoo(accessToken);
    return user;
  }

  private async getUserDetailsFromYahoo(accessToken: string): Promise<any> {
    // Example: Make a request to the Yahoo API to get user details using the access token
    // Replace this with the actual implementation based on Yahoo API documentation
    // This is a placeholder and should be adapted to your needs
    // Ensure to handle errors appropriately
    const yahooApiUrl = 'https://api.login.yahoo.com/userinfo';
    const response = await fetch(yahooApiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to retrieve user details from Yahoo API');
    }

    const user = await response.json();
    return user;
  }
}
