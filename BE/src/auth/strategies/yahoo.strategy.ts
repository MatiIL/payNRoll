// yahoo.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-oauth2';
import { ConfigService } from '@nestjs/config';
import { YahooApiService } from 'src/yahoo-api/yahoo-api.service';

@Injectable()
export class YahooStrategy extends PassportStrategy(Strategy, 'yahoo') {
  constructor(
    private readonly configService: ConfigService,
    private readonly yahooApiService: YahooApiService, // Inject YahooApiService
  ) {
    super({
      authorizationURL: 'https://api.login.yahoo.com/oauth2/request_auth',
      tokenURL: 'https://api.login.yahoo.com/oauth2/get_token',
      clientID: configService.get<string>('YAHOO_CLIENT_ID'),
      clientSecret: configService.get<string>('YAHOO_CLIENT_SECRET'),
      callbackURL: 'https://pay-n-roll.vercel.app/home/auth/yahoo/callback',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    try {
      // Fetch data from Yahoo Fantasy API using YahooApiService
      const games = await this.yahooApiService.fetchYahooGameData(accessToken);
      console.log(games)

      // You can now use the 'games' data as needed
      console.log(done)
      // You can also pass additional data to the frontend if required
      return done(null, {
        yahooId: profile.id,
        email: profile.emails[0].value,
        accessToken,
        games,
      });
    } catch (error) {
      return done(error, false);
    }
  }
}
