import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageModel } from 'src/dataAccess/schemas';
import { MessageRepository } from 'src/dataAccess/repositories';

@Module({
  imports: [MongooseModule.forFeature([MessageModel]), HttpModule],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository],
})
export default class MessageModule {}
