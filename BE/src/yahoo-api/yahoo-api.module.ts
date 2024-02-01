import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { YahooController } from './yahoo-api.controller';
import { YahooApiService } from './yahoo-api.service';

@Module({
  imports: [HttpModule.register({})],
  controllers: [YahooController],
  providers: [YahooApiService],
  exports: [YahooApiService], 
})
export class YahooModule {}