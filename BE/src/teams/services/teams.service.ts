import { Injectable } from "@nestjs/common";
// import { Team } from "../../../../shared/team";
import { Team } from "../schemas/teams.schema"
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose"


@Injectable()
export class TeamService {

    constructor(@InjectModel('teams') private teamsModel: Model<Team>) {}

    async findAllTeams(): Promise<Team[]> {
        return this.teamsModel.find().exec();
    }  
}
