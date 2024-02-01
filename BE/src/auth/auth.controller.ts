import { Controller, Req, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from '../users/schemas/users.schema';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import JwtAuthGuard from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { YahooApiService } from '../yahoo-api/yahoo-api.service';

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

@UseGuards(JwtAuthGuard)
@Get('yahoo-authenticate')
async yahooAuthenticate(@Req() req: Request, @Res() res: Response) {
  try {
    // Redirect the user to Yahoo for authentication
    this.yahooApiService.authenticate(res);
  } catch (error) {
    throw new Error('Internal Server Error');
  }
}

  @Get('yahoo-callback')
  async yahooCallback(@Req() req: Request, @Res() res: Response) {
    try {
      // Extract Yahoo OAuth parameters from the request
      const oauthToken = req.query.oauth_token as string;
      const oauthVerifier = req.query.oauth_verifier as string;

      // Exchange the authorization code for Yahoo access tokens
      const yahooTokens = await this.yahooApiService.exchangeAuthorizationCode(
        oauthVerifier,
        'https://pay-n-roll.vercel.app/home', // Replace with your actual callback URL
      );

      // Now you can use Yahoo access tokens (yahooTokens) as needed

      // Optionally, you can associate Yahoo tokens with the current user
      const currentUser = req.user as User;
      // Save yahooTokens to the user's profile or database record

      // Redirect or respond as needed
      res.redirect('https://pay-n-roll.vercel.app/home');
    } catch (error) {
      throw new Error('Internal Server Error');
    }
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    this.authService.logout(response);
    response.json({});
  }
}
