import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetMessagesDto, RegisterDto, AddFriendDto } from 'src/dto';

@Controller('chats')
@ApiTags('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: `get client's messages` })
  public async getMessagesController(@Query() getMessageDto: GetMessagesDto) {
    return this.chatService.getMessagesService(getMessageDto);
  }

  @Post('/register')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'register to chat app' })
  public async registerController(@Body() registerDto: RegisterDto) {
    return this.chatService.registerService(registerDto);
  }

  @Post('/friend')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'add friend' })
  public async addFriendController(@Body() addFriendDto: AddFriendDto) {
    return this.chatService.addFriendService(addFriendDto);
  }
}
