import { Injectable } from '@nestjs/common';
import { Team } from '../schemas/teams.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTeamInput } from '../inputs/create-team.input';
import { ChosenKeepersInput } from '../inputs/ChosenKeepersInput';
import { UpdateChosenKeepersResponse } from '../responses/UpdateChosenKeepersResponse';

@Injectable()
export class TeamService {
  constructor(@InjectModel('teams') private teamsModel: Model<Team>) {}

  async findAllTeams(): Promise<Team[]> {
    return this.teamsModel.find().exec();
  }

  async teamByName(teamName: String): Promise<Team | null> {
    return this.teamsModel.findOne({ name: teamName });
  }

  async createTeam(team: CreateTeamInput): Promise<Team> {
    return await this.teamsModel.create(team);
  }

  async updateChosenKeepers(
    input: ChosenKeepersInput,
  ): Promise<UpdateChosenKeepersResponse> {
    const team = await this.teamsModel.findOne({
      manager_id: input.manager_id,
    });
    if (!team) {
      throw new Error('Team not found');
    }

    team.nextYearBudget = input.nextYearBudget;
    team.currentRoster = input.currentRoster.map((player) => ({
      player: player.player,
      purchasePrice: player.purchasePrice,
      keeperStatus: player.keeperStatus,
      nextSeasonSalary: player.nextSeasonSalary,
      contractLength: player.contractLength,
      YOS: player.YOS,
    }));

    await team.save();

    return {
      manager_id: team.manager_id,
      nextYearBudget: team.nextYearBudget,
      currentRoster: team.currentRoster,
    };
  }
}
