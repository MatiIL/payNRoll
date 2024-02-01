import { Controller, Get, Query, Res, Redirect } from '@nestjs/common';
import { Response } from 'express';
import { YahooApiService } from './yahoo-api.service';

@Controller('yahoo-api')
export class YahooController {
  constructor(private readonly yahooApiService: YahooApiService) {}

  @Get('authenticate')
  async authenticate(res: Response) {
    const authUrl = await this.yahooApiService.authenticate(res);
    return { url: authUrl };
  }

  @Get('callback')
  async handleCallback(@Query('code') req: { query: { code: string; state: string } }) {
    const result = await this.yahooApiService.handleCallback(req);
    return result;
  }
}