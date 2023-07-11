import { Injectable, Logger } from '@nestjs/common';
import { MessageRepository } from 'src/dataAccess/repositories/message.repository';
import {
  GetMessagesDto,
  SendMessageDto,
  UpdateMessageStatusDto,
} from 'src/dto';

@Injectable()
export class MessageService {
  constructor(
    private MessageDataAccess: MessageRepository,
  ) {}

  private readonly logger = new Logger(MessageService.name);

  async getMessages(getMessagesDto: GetMessagesDto) {
    return this.MessageDataAccess.getUsersMessagesDB(getMessagesDto.user);
  }

  async sendMessage(sendMessageDto: SendMessageDto) {
    return this.MessageDataAccess.createMessageDB(sendMessageDto);
  }

  async updateMessageStatus(updateMessageStatusDto: UpdateMessageStatusDto) {
    return this.MessageDataAccess.updateMessageStatusDB(
      updateMessageStatusDto.messageId,
      updateMessageStatusDto.status,
    );
  }
}