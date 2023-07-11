import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { EventsGateway } from './events.gateway';
import { ServiceCallersModule } from 'src/serviceCallers/serviceCaller.module';
import ServiceCaller from 'src/serviceCallers/serviceCaller';
import { IUserInterface } from 'src/interfaces';
import UserServiceCaller from 'src/serviceCallers/user.service';
import SocketModule from 'src/modules/socket/socket.module';

@Module({
  imports: [HttpModule, ServiceCallersModule, SocketModule, ConfigModule],
  providers: [
    EventsGateway,
    ServiceCaller,
    {
      provide: IUserInterface,
      useClass: UserServiceCaller,
    },
  ],
  exports: [EventsGateway],
})
export default class EventsModule {}
