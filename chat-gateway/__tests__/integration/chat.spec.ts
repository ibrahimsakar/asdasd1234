import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import ChatModule from '../../src/api/chat/chat.module';
import { ChatService } from '../../src/api/chat/chat.service';
import { IChatInterface, IUserInterface } from '../../src/interfaces';
import ChatMockServiceCaller from '../helpers/mocks/serviceCallers/chat.mock.service';
import UserMockServiceCaller from '../helpers/mocks/serviceCallers/user.mock.service';

const controllerRoute = '/chats';

let app: INestApplication;

beforeAll(async () => {
  const chatTestModule: TestingModule = await Test.createTestingModule({
    imports: [ChatModule],
  })
    .overrideProvider(IChatInterface)
    .useClass(ChatMockServiceCaller)
    .overrideProvider(IUserInterface)
    .useClass(UserMockServiceCaller)
    .compile();

  chatTestModule.get<ChatService>(ChatService);

  app = chatTestModule.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await app.close();
});

jest.setTimeout(100000);

describe('Chat tests', () => {
  it('get messages successfully', async () => {
    const query = {
      userId: new ObjectId('643661dc8bc2f9c755904737'),
    };
    const data = await request(app.getHttpServer())
      .get(controllerRoute)
      .query(query);
    expect(data.status).toEqual(200);
  });

  it('register successfully', async () => {
    const payload = {
      email: 'ibrahim@ibrahim.com',
      password: '12345',
    };
    const data = await request(app.getHttpServer())
      .post(`${controllerRoute}/register`)
      .send(payload);
    expect(data.status).toEqual(200);
  });

  it('add friend successfully', async () => {
    const payload = {
      chat: new ObjectId('64abc0599771025b8cd78fec'),
      friend: new ObjectId('64abc0599771025b8cd78fed'),
    };
    const data = await request(app.getHttpServer())
      .post(`${controllerRoute}/friend`)
      .send(payload);
    expect(data.status).toEqual(200);
  });
});
