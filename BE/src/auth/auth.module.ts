import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { YahooAuthService } from './yahoo/yahoo-auth.service';
import { OAuthService } from './o-auth/oauth-service';
import { YahooStrategy } from './strategies/yahoo.strategy';
import { YahooAuthGuard } from './guards/yahoo-auth.guard';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, YahooAuthService, OAuthService, YahooStrategy, YahooAuthGuard],
})
export class AuthModule {}