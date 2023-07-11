import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Friendship } from './friendship.schema';

@Schema({
  timestamps: true,
  id: true,
  _id: true,
  versionKey: false,
})
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  readonly _id: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.String,
    required: true,
  })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.String,
    required: true,
  })
  email: string;

  @Prop({
    type: mongoose.Schema.Types.String,
    required: true,
  })
  password: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Friendship' }])
  friends: Friendship[];
}

export type UserDocument = User & mongoose.Document;
export const UserSchema = SchemaFactory.createForClass(User);
export const UserModel = {
  name: User.name,
  schema: UserSchema,
};
