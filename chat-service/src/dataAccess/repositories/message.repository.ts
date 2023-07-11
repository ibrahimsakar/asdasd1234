import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../schemas';

@Injectable()
export class MessageRepository {
  constructor(
    @InjectModel(Message.name)
    private readonly MessageModel: Model<MessageDocument>,
  ) {}

  getUsersMessagesDB(reciever) {
    return this.MessageModel.find({ reciever });
  }

  createMessageDB(messageQuery) {
    return this.MessageModel.create(messageQuery);
  }

  updateMessageStatusDB(messageId: string, status) {
    return this.MessageModel.findOneAndUpdate(
      { _id: messageId },
      { $set: { status } },
    );
  }
}
