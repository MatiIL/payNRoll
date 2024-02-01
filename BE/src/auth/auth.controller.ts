import { Controller, Req, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from '../users/schemas/users.schema';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { YahooAuthGuard } from './guards/yahoo-auth.guard';
import { YahooStrategy } from './strategies/yahoo.strategy';
import { YahooAuthService } from './yahoo/yahoo-auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly yahooStrategy: YahooStrategy,
    private readonly yahooAuthService: YahooAuthService,
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
  yahooLogin(@Req() request: Request) {
    const accessToken = request.query['access_token'] as string;
    this.yahooAuthService.validate(accessToken);
  }

  @UseGuards(YahooAuthGuard)
  @Get('yahoo/callback')
  async yahooAuthCallback(@CurrentUser() user: User, @Res() response: Response) {
    await this.authService.login(user, response); // Assuming your login method handles Yahoo authentication
    response.redirect('/'); // Redirect to your app's home page or wherever you need
  }
}