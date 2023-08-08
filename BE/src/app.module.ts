import { Module,  NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import * as cors from 'cors'; 
import { TeamsModule } from './teams/teams.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    TeamsModule,
    UserModule,
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors({ origin: 'http://localhost:4200', credentials: true })) 
      .forRoutes('*'); 
  } 
}