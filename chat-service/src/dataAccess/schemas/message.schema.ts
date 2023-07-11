import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { MESSAGE_STATUS } from 'src/common/constants';

@Schema({
  timestamps: true,
  id: true,
  _id: true,
  versionKey: false,
})
export class Message {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  readonly _id: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.Number,
    required: true,
    default: MESSAGE_STATUS.SENT,
  })
  status: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  sender: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  reciever: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.String,
  })
  message: string;
}

export type MessageDocument = Message & Document;
export const MessageSchema = SchemaFactory.createForClass(Message);
export const MessageModel = {
  name: Message.name,
  schema: MessageSchema,
};
