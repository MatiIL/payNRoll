import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamsModule } from './teams/teams.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI ||'mongodb+srv://matibres:AkeEKFqR0CME09tY@cluster0.dakcj7n.mongodb.net/', { dbName: 'payNroll'}),
    TeamsModule,
  ],
})

export class AppModule {}

  // configure(consumer: MiddlewareConsumer): void {
  //   consumer.apply().forRoutes(TeamsController);
  // }


