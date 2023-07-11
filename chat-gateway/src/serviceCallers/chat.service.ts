import { Injectable } from '@nestjs/common';
import ServiceCaller from './serviceCaller';
import { SERVICES } from 'src/common/constants';
import { IChatInterface } from 'src/interfaces';

@Injectable()
export default class ChatServiceCaller implements IChatInterface {
  constructor(private readonly serviceCaller: ServiceCaller) {}

  async send(sender: string, recipient: string, content: string): Promise<any> {
    return this.serviceCaller.request(SERVICES.CHAT, 'POST', 'messages', {
      sender,
      recipient,
      content,
    });
  }

  async update(messageId: string, status: number): Promise<any> {
    return this.serviceCaller.request(SERVICES.CHAT, 'PUT', 'messages', {
      messageId,
      status,
    });
  }

  async getMessages(user: string): Promise<any> {
    return this.serviceCaller.request(
      SERVICES.CHAT,
      'GET',
      'messages',
      {},
      { user },
    );
  }
}
