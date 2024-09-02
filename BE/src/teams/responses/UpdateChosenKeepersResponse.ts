import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PlayerInfo } from '../schemas/teams.schema';

@ObjectType()
export class UpdateChosenKeepersResponse {
  @Field()
  manager_id: string;

  @Field(() => Int)
  nextYearBudget: number;

  @Field(() => [PlayerInfo])
  currentRoster: PlayerInfo[];
}
