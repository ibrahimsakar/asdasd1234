import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  GetMessagesDto,
  SendMessageDto,
  UpdateMessageStatusDto,
} from 'src/dto';

@Controller('messages')
@ApiTags('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get messages' })
  public async getMessagesController(
    @Query() getMessagesDto: GetMessagesDto,
  ) {
    return this.messageService.getMessages(getMessagesDto);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send message' })
  public async sendMessageController(
    @Body() sendMessageDto: SendMessageDto,
  ) {
    return this.messageService.sendMessage(sendMessageDto);
  }
  
  @Put()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update message status' })
  public async updateMessageStatusController(
    @Body() updateMessageStatusDto: UpdateMessageStatusDto,
  ) {
    return this.messageService.updateMessageStatus(updateMessageStatusDto);
  }
}