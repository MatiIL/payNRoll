import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { TeamSchema } from "./schemas/teams.schema";
import { TeamsController } from "./controllers/teams.controller";
import { TeamService } from "./services/teams.service";


@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: "teams", schema: TeamSchema
            }
        ])
    ],
    controllers: [
        TeamsController
    ],
    providers: [
        TeamService
    ]
})

export class TeamsModule {

}