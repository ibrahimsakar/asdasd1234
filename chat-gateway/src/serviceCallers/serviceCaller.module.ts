import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import ServiceCaller from './serviceCaller';
import ChatServiceCaller from './chat.service';
import UserServiceCaller from './user.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [ServiceCaller, ChatServiceCaller, UserServiceCaller],
  exports: [ChatServiceCaller, UserServiceCaller],
})
export class ServiceCallersModule {}
