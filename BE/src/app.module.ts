import { 
  Module, 
  NestModule, 
  MiddlewareConsumer,
 } from '@nestjs/common';
 import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import * as Joi from 'joi';
import { TeamsModule } from './teams/teams.module';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CorsMiddleware } from './cors.middleware'; 
import { YahooModule } from './yahoo-api/yahoo-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DB_URL: Joi.string().required(),
        JWT_EXPIRATION: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    HttpModule.register({}),
    TeamsModule,
    UserModule,
    AuthModule,
    YahooModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*'); 
  }
}
