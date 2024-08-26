import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Team } from '../schemas/teams.schema';
import { TeamService } from '../services/teams.service';
import { CreateTeamInput } from '../inputs/create-team.input';
import { ChosenKeepersInput } from '../inputs/ChosenKeepersInput';



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
    return this.teamService.createTeam(team);
  }

  @Mutation(() => Boolean)
  updateChosenKeepers(
    @Args('input') input: ChosenKeepersInput,
  ): boolean {
    // Logic to update chosen keepers based on the input
    return true; // or some other return type
  }
  
}
