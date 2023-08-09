import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { UserSchema } from "./schemas/users.schema";
import { UserResolver } from "./resolvers/users.resolver";
import { UserService } from "./services/users.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: "users", schema: UserSchema }
        ]),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
          }),
    ],
    providers: [
        UserService,
        UserResolver
    ],
    exports: [UserService]
})

export class UserModule {

}