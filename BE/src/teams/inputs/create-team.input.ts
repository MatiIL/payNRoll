import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateTeamInput {
  @Field()
  name: string;

  @Field()
  manager_id: string;

  @Field(() => Int)
  nextYearBudget: number;

  @Field(() => [PlayerInput])
  currentRoster: PlayerInput[];

  @Field(() => [[PlayerInput]])
  prevRosters: PlayerInput[][];

  @Field(() => [DraftRecordInput])
  draftRecord: DraftRecordInput[];
}

@InputType()
export class PlayerInput {
  @Field()
  player: string;

  @Field(() => Int)
  purchasePrice: number;

  @Field(() => Int)
  keeperStatus: number;

  @Field(() => Int)
  YOS: number;

  @Field()
  nextSeasonSalary?: Number;

  @Field()
  contractLength?: Number;
}

@InputType()
class DraftRecordInput {
  @Field(() => Int)
  season: number;

  @Field(() => Int)
  draftPosition: number;

  @Field()
  playerDrafted: string;
}

