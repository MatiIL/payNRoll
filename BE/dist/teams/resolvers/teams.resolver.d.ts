import { Team } from '../schemas/teams.schema';
import { TeamService } from '../services/teams.service';
import { CreateTeamInput } from '../inputs/create-team.input';
export declare class TeamResolver {
    private readonly teamService;
    constructor(teamService: TeamService);
    findAllTeams(): Promise<Team[]>;
    findTeam(name: string): Promise<Team | null>;
    addNewTeam(team: CreateTeamInput): Promise<Team>;
}
