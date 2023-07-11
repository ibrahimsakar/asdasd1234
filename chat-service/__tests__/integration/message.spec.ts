import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import dbManager from '../helpers/dbManager';
import MessageModule from '../../src/api/message/message.module';
import { MessageService } from '../../src/api/message/message.service';
import MessageData from '../seed-data/messages/data';

const controllerRoute = '/messages';

let app: INestApplication;

beforeAll(async () => {
  await dbManager.start();
  const messageTestModule: TestingModule = await Test.createTestingModule({
    imports: [MessageModule, dbManager.getRootMongooseModule()],
  }).compile();

  messageTestModule.get<MessageService>(MessageService);

  app = messageTestModule.createNestApplication();
  await app.init();
});

beforeEach(async () => {
  await dbManager.seed('messages', MessageData);
});

afterEach(async () => {
  await dbManager.cleanCollections();
});

afterAll(async () => {
  await dbManager.stop();
  await app.close();
});

jest.setTimeout(100000);

describe('User tests', () => {
  it('get messages successfully', async () => {
    const query = {
      user: new ObjectId(),
    };
    const data = await request(app.getHttpServer())
      .get(controllerRoute)
      .query(query);
    expect(data.status).toEqual(200);
  });

  it('send message successfully', async () => {
    const payload = {
      sender: new ObjectId('64abc0599771025b8cd78fed'),
      reciever: new ObjectId('64abc0599771025b8cd78fec'),
      message: 'Soluta deserunt eos quam reiciendis libero autem enim nam ut.'
    };
    const data = await request(app.getHttpServer())
      .post(controllerRoute)
      .send(payload);
    expect(data.status).toEqual(200);
  });

  it('update message status successfully', async () => {
    const payload = {
      messageId: new ObjectId(),
      status: 200,
    };
    const data = await request(app.getHttpServer())
      .put(controllerRoute)
      .send(payload);
    expect(data.status).toEqual(200);
  });
});
