import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ChosenKeepersInput {
  @Field()
  manager_id: string;

  @Field(() => Int)
  nextYearBudget: number;

  @Field(() => [PlayerInput])
  currentRoster: PlayerInput[];
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
