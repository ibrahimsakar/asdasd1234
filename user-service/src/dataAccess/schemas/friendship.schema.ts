import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({
  timestamps: true,
  id: true,
  _id: true,
  versionKey: false,
})
export class Friendship {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  friend: mongoose.Schema.Types.ObjectId;
}

export type FriendshipDocument = Friendship & mongoose.Document;
export const FriendshipSchema = SchemaFactory.createForClass(Friendship);
export const FriendshipModel = {
  name: Friendship.name,
  schema: FriendshipSchema,
};
