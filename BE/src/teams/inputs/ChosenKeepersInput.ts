import { InputType, Field, Int } from '@nestjs/graphql';
import { PlayerInput } from './create-team.input';

@InputType()
export class ChosenKeepersInput {
  @Field()
  manager_id: string;

  @Field(() => Int)
  nextYearBudget: number;

  @Field(() => [PlayerInput])
  currentRoster: PlayerInput[];
}
