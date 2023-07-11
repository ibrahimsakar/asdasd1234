import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ServiceCallersModule } from 'src/serviceCallers/serviceCaller.module';
import ServiceCaller from 'src/serviceCallers/serviceCaller';
import { IChatInterface, IUserInterface } from 'src/interfaces';
import UserServiceCaller from 'src/serviceCallers/user.service';
import ChatServiceCaller from 'src/serviceCallers/chat.service';

@Module({
  imports: [HttpModule, ServiceCallersModule, ConfigModule],
  controllers: [ChatController],
  providers: [
    ChatService,
    {
      provide: IChatInterface,
      useClass: ChatServiceCaller,
    },
    ServiceCaller,
    {
      provide: IUserInterface,
      useClass: UserServiceCaller,
    },
  ],
})
export default class ChatModule {}
