import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { Document, Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema({ collection: 'users' })
export class User extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, auto: true })
  @Field(() => String)
  userId: string;

  @Field()
  @Prop({ type: String, required: true })
  email: string;

  @Field()
  @Prop({ type: String, required: true })
  password: string;

  @Field()
  @Prop({ type: String, required: true })
  firstName: string;

  @Field()
  @Prop({ type: String, required: true })
  lastName: string;

  @Field()
  @Prop({ type: String, required: false })
  teamName: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
