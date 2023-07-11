import { Injectable } from '@nestjs/common';
import { IChatInterface } from '../../../../src/interfaces/chat.interface';
import { messages } from '../data/messages';

@Injectable()
export default class ChatMockServiceCaller implements IChatInterface {
  async getMessages(userId: string): Promise<any> {
    return Promise.resolve(
      messages.filter((message) => message.reciever.toString() === userId),
    );
  }

  async send(
    sender: string,
    friend: string,
    content: string,
    status: number,
  ): Promise<any> {
    return Promise.resolve();
  }

  async update(messageId: string, status: number): Promise<any> {
    return Promise.resolve();
  }
}
