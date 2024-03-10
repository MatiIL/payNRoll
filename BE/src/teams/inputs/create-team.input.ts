import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
class RookiesDraftDetailsInput {
  @Field()
  incomingPick: string;

  @Field()
  outgoingPick: string;

  @Field()
  swapRightsWith: string;

  @Field(() => Int)
  draftPosition: number;
}

@InputType()
export class CreateTeamInput {
  @Field()
  name: string;

  @Field()
  manager_id: string;

  @Field(() => Int)
  nextYearBudget: number;

  @Field(() => RookiesDraftDetailsInput)
  rookiesDraftDetails: RookiesDraftDetailsInput;

  @Field(() => [PlayerInput])
  currentRoster: PlayerInput[];

  @Field(() => [[PlayerInput]])
  prevRosters: PlayerInput[][];

  @Field(() => [DraftRecordInput])
  draftRecord: DraftRecordInput[];
}

@InputType()
class PlayerInput {
  @Field()
  player: string;

  @Field(() => Int)
  purchasePrice: number;

  @Field(() => Int)
  keeperStatus: number;

  @Field(() => Int)
  YOS: number;
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