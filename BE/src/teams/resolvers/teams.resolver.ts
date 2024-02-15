import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Team } from '../schemas/teams.schema';
import { TeamService } from '../services/teams.service';
import { CreateTeamInput } from '../inputs/create-team.input';

@Resolver(() => Team)
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @Query(() => [Team])
  async findAllTeams(): Promise<Team[]> {
    return this.teamService.findAllTeams();
  }

  @Query(() => Team, { nullable: true })
  async findTeam(@Args('name') name: string): Promise<Team | null> {
    return this.teamService.teamByName(name);
  }

  @Mutation(() => Team)
  async addNewTeam(@Args('team') team: CreateTeamInput): Promise<Team> {
    console.log(team)
    return this.teamService.createTeam(team);
  }
}