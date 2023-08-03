import { TeamService } from "../services/teams.service";
import { Team } from "../schemas/teams.schema";
import { CreateTeamDto } from "../dtos/team.dto";
export declare class TeamsController {
    private readonly teamService;
    constructor(teamService: TeamService);
    findAllTeams(): Promise<Team[]>;
    findTeam(name: String): Promise<Team[]>;
    addNewTeam(body: CreateTeamDto): Promise<Team>;
}
