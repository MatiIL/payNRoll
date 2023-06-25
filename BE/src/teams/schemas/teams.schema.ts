import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'teams' })
export class Team extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  manager_id: string;

  @Prop({ type: Number, required: true })
  nextYearBudget: number;

  @Prop({
    required: true,
    type: [
      {
        player: String,
        purchasePrice: Number,
        keeperStatus: Number,
        YOS: Number,
      },
    ],
  })
  currentRoster: {
    player: string;
    purchasePrice: number;
    keeperStatus: number;
    YOS: number;
  };

  @Prop({ required: true, type: [[]] })
  prevRosters: [[]];

  @Prop({
    required: true,
    type: [
      {
        season: Number,
        draftPosition: Number,
        playerDrafted: String,
      },
    ],
  })
  draftRecord: {
    season: number;
    draftPosition: number;
    playerDrafted: string;
  };
}

export const TeamSchema = SchemaFactory.createForClass(Team);
