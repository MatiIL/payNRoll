import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SignupResponse {
  @Field()
  success: boolean;

  @Field()
  userId: string;

  @Field()
  firstName: string;

  @Field({ nullable: true }) // Make teamName optional
  teamName?: string;
}
