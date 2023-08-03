import { Team } from "../schemas/teams.schema";
import { Model } from "mongoose";
export declare class TeamService {
    private teamsModel;
    constructor(teamsModel: Model<Team>);
    findAllTeams(): Promise<Team[]>;
    teamByName(teamName: String): Promise<Team[]>;
    createTeam(team: Partial<Team>): Promise<Team>;
}
