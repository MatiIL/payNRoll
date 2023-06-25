import { Controller } from "@nestjs/common";
import { TeamService } from "../services/teams.service";
import { Get } from "@nestjs/common";
import { Team } from "../schemas/teams.schema";


@Controller("teams")
export class TeamsController {
    constructor(private teamService: TeamService) {

    }
    @Get('all')
    async findAllTeams(): Promise<Team[]> {
        return this.teamService.findAllTeams();
    }
}