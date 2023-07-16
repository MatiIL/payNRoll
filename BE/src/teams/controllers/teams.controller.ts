import { Controller, Param } from "@nestjs/common";
import { TeamService } from "../services/teams.service";
import { Get, Post, Put, Delete, Body } from "@nestjs/common";
import { Team } from "../schemas/teams.schema";
import { CreateTeamDto } from "../dtos/team.dto";


@Controller("teams")
export class TeamsController {
    constructor(private readonly teamService: TeamService) {

    }
    @Get("all")
    async findAllTeams(): Promise<Team[]> {
        return this.teamService.findAllTeams();
    }

    @Get(":name")
    async findTeam(@Param("name")name:String): Promise<Team[]> {
        return this.teamService.teamByName(name);
    }

    @Post("add-team")
    async addNewTeam(@Body() body: CreateTeamDto): Promise<Team> {
        return this.teamService.createTeam(body);
    }
}