import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { User } from '../users/schemas/users.schema';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { YahooAuthGuard } from './guards/yahoo-auth.guard';
import { YahooStrategy } from './strategies/yahoo.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly yahooStrategy: YahooStrategy,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.json({ success: true, user });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  isAuthenticated() {
    return true;
  }

  @UseGuards(YahooAuthGuard)
  @Get('yahoo')
  yahooLogin() {
    // This endpoint will initiate the Yahoo OAuth flow
  }

  @UseGuards(YahooAuthGuard)
  @Get('yahoo/callback')
  yahooAuthCallback(@Res() response: Response) {
    // Handle the successful authentication callback
    response.redirect('/'); // Redirect to your app's home page or wherever you need
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    this.authService.logout(response);
    response.json({});
  }
}
