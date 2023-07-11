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
  app.useWebSocketAdapter(new SocketIoAdapter(app.getHttpServer()));
  await app.init();
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

    socket.emit('authenticate', {
      email: 'ibrahim@ibrahim.com',
      password: '123456',
    });
  });

  it('authenticationFailed test', (done) => {
    const socket = io(getSocketDsn());
    socket.on('authenticationFailed', () => {
      done();
    });

    socket.emit('authenticate', {
      email: 'ibrahim@ibrahim.com',
      password: '111111',
    });
  });
});
