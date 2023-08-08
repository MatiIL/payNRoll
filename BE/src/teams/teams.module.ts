import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { TeamSchema } from "./schemas/teams.schema";
import { TeamService } from "./services/teams.service";
import { TeamResolver } from "./resolvers/teams.resolver";


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: "teams", schema: TeamSchema }
        ]),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
          }),
    ],
    providers: [
        TeamService,
        TeamResolver
    ]
})

export class TeamsModule {}