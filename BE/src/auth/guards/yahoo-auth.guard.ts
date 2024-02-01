import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { YahooAuthService } from '../yahoo/yahoo-auth.service';

@Injectable()
export class YahooAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly yahooAuthService: YahooAuthService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // You may need to adjust this based on how the access token is sent in your actual implementation
    const request = context.switchToHttp().getRequest();
    const accessToken = request.query?.access_token;

    return this.yahooAuthService.validate(accessToken);
  }
}
