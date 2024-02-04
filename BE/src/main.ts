import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CorsMiddleware } from './cors.middleware';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import * as uuid from 'uuid';

const sessionSecretKey = uuid.v4();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new CorsMiddleware().use);
  app.use(cookieParser());

  app.enableCors({
    origin: [
      'https://pay-n-roll.vercel.app', 
      'https://pay-n-roll.vercel.app/home', 
      'https://api.login.yahoo.com/oauth2/request_auth/.well-known/openid-configuration',
      'http://localhost:4200'],
    credentials: true,
  });

  app.use(
    session({
      secret: sessionSecretKey,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  await app.listen(port);
}

bootstrap();