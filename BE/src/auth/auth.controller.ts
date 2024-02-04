import { Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { User } from '../users/schemas/users.schema';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { YahooApiService } from 'src/yahoo-api/yahoo-api.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly yahooApiService: YahooApiService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.login(user, res);
    res.json({ success: true, user });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  isAuthenticated() {
    return true;
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    this.authService.logout(response);
    response.json({});
  }

  @Get('yahoo-auth')
  yahooAuth(@Res() res: Response) {
    this.yahooApiService.initiateAuthentication(res);
  }

  @Get('yahoo/callback')
  async yahooCallback(@Query('code') code: string, @Res() res: any) {
    try {
      const tokens = await this.yahooApiService.exchangeCodeForTokens(code);
      console.log(tokens)

      // Handle tokens as needed (store in database, set cookies, etc.)
      // ...

      // Redirect or respond as appropriate
      res.redirect('/');
    } catch (error) {
      // Handle errors (redirect to an error page, log, etc.)
      console.error('Error exchanging code for tokens:', error);
      res.redirect('/error');
    }
  }

}
