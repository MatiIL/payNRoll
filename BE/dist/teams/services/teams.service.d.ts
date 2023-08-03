import { Team } from "../schemas/teams.schema";
import { Model } from "mongoose";
import { CreateTeamInput } from '../inputs/create-team.input';
export declare class TeamService {
    private teamsModel;
    constructor(teamsModel: Model<Team>);
    findAllTeams(): Promise<Team[]>;
    teamByName(teamName: String): Promise<Team | null>;
    createTeam(team: CreateTeamInput): Promise<Team>;
}
