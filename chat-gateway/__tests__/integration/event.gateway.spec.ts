import { io, Socket } from 'socket.io-client';
// import { Server, Socket } from 'socket.io';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { createWebSocketServer } from '../helpers/webscoket.helper';
import EventsModule from '../../src/events/events.module';
import { EventsGateway } from '../../src/events/events.gateway';
// import { SocketIoAdapter } from '../../src/adapters/socketio.adapter';
import { IUserInterface, IChatInterface } from '../../src/interfaces';
import UserMockServiceCaller from '../helpers/mocks/serviceCallers/user.mock.service';
import ChatMockServiceCaller from '../helpers/mocks/serviceCallers/chat.mock.service';

let app: INestApplication;
let socket: Socket;

beforeAll(async () => {
  const eventTestModule: TestingModule = await Test.createTestingModule({
    imports: [EventsModule],
  })
    .overrideProvider(IUserInterface)
    .useClass(UserMockServiceCaller)
    .overrideProvider(IChatInterface)
    .useClass(ChatMockServiceCaller)
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

  it('send message offline friend successfully', (done) => {
    socket.on('messageSent', () => {
      done();
    });
    socket.emit('authenticate', {
      email: 'ibrahim@ibrahim.com',
      password: '123456',
    });
    socket.emit('message', {
      message: 'Send message'
    });
  });

  it('send message online friend successfully', (done) => {
    socket.on('messageDelivered', () => {
      done();
    });
    socket.emit('authenticate', {
      email: 'ibrahim@ibrahim.com',
      password: '123456',
    });
    socket.emit('authenticate', {
      email: 'ozan@ozan.com',
      password: '123456',
    });
    socket.emit('message', {
      message: 'Send message'
    });
  });
});
