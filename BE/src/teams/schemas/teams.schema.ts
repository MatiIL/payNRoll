import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';


@ObjectType()
export class RookiesDraftDetails {
  @Field()
  incomingPick: string;

  @Field()
  outgoingPick: string;

  @Field()
  swapRightsWith: string;

  @Field()
  draftPosition: number;
}

@ObjectType()
@Schema({ collection: 'teams' })
export class Team extends Document {
  
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  @Field(() => String)
  _id: string;

  @Field()
  @Prop({ type: String, required: true })
  name: string;

  @Field()
  @Prop({ type: String, required: true })
  manager_id: string;

  @Field()
  @Prop({ type: Number, required: true })
  nextYearBudget: number;

  @Field()
  @Prop({ type: Number, required: false })
  finalRank: number;

  @Field(() => RookiesDraftDetails)
  @Prop({
    required: true,
    type: {
        incomingPick: String,
        outgoingPick: String,
        swapRightsWith: String,
        draftPosition: Number,
      }
  })
  rookiesDraftDetails: RookiesDraftDetails
  
  @Field(() => [PlayerInfo])
  @Prop({
    required: false,
    type: [
      {
        _id: false,
        player: String,
        purchasePrice: Number,
        keeperStatus: Number,
        nextSeasonSalary: String,
        contractLength: String, 
        YOS: Number,
      },
    ],
  })
  currentRoster: PlayerInfo[];

  @Field(() => [[String]])
  @Prop({ required: false })
  prevRosters: string[][];

  @Field(() => [DraftRecord])
  @Prop({
    required: false,
    type: [
      {
        _id: false,
        season: Number,
        draftPosition: Number,
        playerDrafted: String,
      },
    ],
  })
  draftRecord: DraftRecord[];
}

@ObjectType()
export class PlayerInfo {
  @Field()
  player: string;

  @Field({ nullable: true })
  purchasePrice: number;

  @Field()
  keeperStatus: number;

  @Field()
  YOS: number;
  
  @Field()
  nextSeasonSalary?: string;

  @Field()
  contractLength?: string;
}

@ObjectType()
export class DraftRecord {
  @Field()
  season: number;

  @Field()
  draftPosition: number;

  @Field()
  playerDrafted: string;
}

export const TeamSchema = SchemaFactory.createForClass(Team);