import { io, Socket } from 'socket.io-client';
// import { Server, Socket } from 'socket.io';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { createWebSocketServer } from '../helpers/webscoket.helper';
import EventsModule from '../../src/events/events.module';
import { EventsGateway } from '../../src/events/events.gateway';
// import { SocketIoAdapter } from '../../src/adapters/socketio.adapter';
import { IUserInterface } from '../../src/interfaces';
import UserMockServiceCaller from '../helpers/mocks/serviceCallers/user.mock.service';

let app: INestApplication;
let socket: Socket;

beforeAll(async () => {
  const eventTestModule: TestingModule = await Test.createTestingModule({
    imports: [EventsModule],
  })
    .overrideProvider(IUserInterface)
    .useClass(UserMockServiceCaller)
    .compile();

  eventTestModule.get<EventsGateway>(EventsGateway);

  app = eventTestModule.createNestApplication();
  socket = createWebSocketServer(app);
  // app.useWebSocketAdapter(new SocketIoAdapter(app.getHttpServer()));
  await app.init();
});

afterAll(async () => {
  await app.close();
});

jest.setTimeout(10000);

describe('event tests', () => {
  it('authentication successfully', (done) => {
    socket.on('authenticated', () => {
      done();
    });

    socket.emit('authenticate', {
      email: 'ibrahim@ibrahim.com',
      password: '123456',
    });
  });

  it('authenticationFailed test', (done) => {
    socket.on('authenticationFailed', () => {
      done();
    });

    socket.emit('authenticate', {
      email: 'ibrahim@ibrahim.com',
      password: '111111',
    });
  });
});
