import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateTeamInput {
  @Field()
  _id: string;

  @Field({ nullable: true }) 
  name?: string;

  @Field(() => Int, { nullable: true })
  nextYearBudget?: number;

  @Field({ nullable: true })
  incomingPick?: string;

  @Field({ nullable: true })
  outgoingPick?: string;

  @Field({ nullable: true })
  swapRightsWith?: string;

  @Field(() => Int, { nullable: true })
  draftPosition?: number;

  @Field(() => [PlayerUpdatedInput], { nullable: true })
  currentRoster?: PlayerUpdatedInput[];

  @Field(() => [[PlayerUpdatedInput]], { nullable: true })
  prevRosters?: PlayerUpdatedInput[];

  @Field(() => [DraftRecordUpdatedInput], { nullable: true })
  draftRecord?: DraftRecordUpdatedInput[];
}

@InputType()
class PlayerUpdatedInput {
  @Field({ nullable: true })
  player: string;

  @Field(() => Int, { nullable: true })
  purchasePrice: number;

  @Field(() => Int, { nullable: true })
  keeperStatus: number;

  @Field(() => Int, { nullable: true })
  YOS: number;
}

@InputType()
class DraftRecordUpdatedInput {
  @Field(() => Int, { nullable: true })
  season?: number;

  @Field(() => Int, { nullable: true })
  draftPosition?: number;

  @Field({ nullable: true })
  playerDrafted?: string;
}