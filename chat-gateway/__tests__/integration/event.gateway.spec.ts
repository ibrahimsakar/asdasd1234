import { io, Socket } from 'socket.io-client';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import EventsModule from '../../src/events/events.module';
import { EventsGateway } from '../../src/events/events.gateway';
import { SocketIoAdapter } from '../../src/adapters/socketio.adapter';
import { IUserInterface } from '../../src/interfaces';
import UserMockServiceCaller from '../helpers/mocks/serviceCallers/user.mock.service';

let app: INestApplication;

beforeAll(async () => {
  const eventTestModule: TestingModule = await Test.createTestingModule({
    imports: [EventsModule],
  })
    .overrideProvider(IUserInterface)
    .useClass(UserMockServiceCaller)
    .compile();

  eventTestModule.get<EventsGateway>(EventsGateway);

  app = eventTestModule.createNestApplication();
  await app.init();
  app.useWebSocketAdapter(new SocketIoAdapter(app.getHttpServer()));
});

afterAll(async () => {
  await app.close();
});

jest.setTimeout(10000);

describe('event tests', () => {
  const getSocketDsn = () => {
    const { port } = app.getHttpServer().listen().address();
    return `http://localhost:${port}`;
  };
  it('authentication successfully', (done) => {
    const socket = io(getSocketDsn());
    socket.on('authenticated', () => {
      done();
    });

    // Socket login
    socket.emit('authenticate', {
      email: 'ibrahim@ibrahim.com',
      password: '123456',
    });
  });

  it('Geçersiz kimlik bilgileriyle giriş yapıldığında "unauthorized" olayı alınmalı', (done) => {
    const socket = io(getSocketDsn());
    socket.on('authenticationFailed', () => {
      done();
    });

    // Socket üzerinden hatalı login işlemi yapma
    socket.emit('authenticate', {
      email: 'ibrahim@ibrahim.com',
      password: '111111',
    });
  });
});