import { Injectable } from '@nestjs/common';
import { Team } from '../schemas/teams.schema';
import { PlayerInfo } from '../schemas/teams.schema';
import { DraftRecord } from '../schemas/teams.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTeamInput } from '../inputs/create-team.input';
import { UpdateTeamInput } from '../inputs/update-team.input';

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

  async updateTeam(teamInput: UpdateTeamInput): Promise<Team> {
    const {
      _id,
      name,
      nextYearBudget,
      incomingPick,
      outgoingPick,
      swapRightsWith,
      draftPosition,
      currentRoster,
      prevRosters,
      draftRecord,
    } = teamInput;

    const updateFields: {
      _id: string;
      name: string;
      nextYearBudget: number;
      rookiesDraftDetails: {
        incomingPick: string;
      outgoingPick: string;
      swapRightsWith: string;
      draftPosition: number;
      }
      currentRoster: PlayerInfo[];
      prevRosters: PlayerInfo[];
      draftRecord: DraftRecord[];
    } = {
      _id: _id,
      name: name,
      nextYearBudget: 0,
      rookiesDraftDetails: {
        incomingPick: '',
      outgoingPick: '',
      swapRightsWith: '',
      draftPosition: 0
      },
      currentRoster: [],
      prevRosters: [],
      draftRecord: []
    }

    if (typeof nextYearBudget !== 'undefined') {
      updateFields.nextYearBudget = nextYearBudget;
    }

    if (incomingPick !== '') {
      updateFields.rookiesDraftDetails.incomingPick = incomingPick;
    }

    if (outgoingPick !== '') {
      updateFields.rookiesDraftDetails.outgoingPick = outgoingPick;
    }

    if (swapRightsWith !== '') {
      updateFields.rookiesDraftDetails.swapRightsWith = swapRightsWith;
    }

    if (draftPosition !== 0) {
      updateFields.rookiesDraftDetails.draftPosition = draftPosition;
    }

    if (typeof currentRoster !== 'undefined') {
      updateFields.currentRoster = currentRoster;
    }
    if (typeof prevRosters !== 'undefined') {
      updateFields.prevRosters = prevRosters;
    }

    const updatedTeam = await this.teamsModel.findOneAndUpdate(
      { _id },
      updateFields, // Pass the dynamically constructed update object
      { new: true },
    );


    if (!updatedTeam) {
      throw new Error(`Team with name ${name} not found.`);
    }

    return updatedTeam;
  }
}
