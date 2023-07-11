import { Module, Global } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { SocketService } from './socket.service';
import { ServiceCallersModule } from 'src/serviceCallers/serviceCaller.module';
import ServiceCaller from 'src/serviceCallers/serviceCaller';
import ChatServiceCaller from 'src/serviceCallers/chat.service';
import { IChatInterface } from 'src/interfaces';

@Global()
@Module({
  imports: [HttpModule, ServiceCallersModule, ConfigModule],
  providers: [
    SocketService,
    ServiceCaller,
    {
      provide: IChatInterface,
      useClass: ChatServiceCaller,
    },
  ],
  exports: [SocketService],
})
export default class SocketModule {}
