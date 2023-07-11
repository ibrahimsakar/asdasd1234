import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import dbManager from '../helpers/dbManager';
import UserModule from '../../src/api/user/user.module';
import { UserService } from '../../src/api/user/user.service';
import UserData from '../seed-data/users/data';

const controllerRoute = '/users';

let app: INestApplication;

beforeAll(async () => {
  await dbManager.start();
  const userTestModule: TestingModule = await Test.createTestingModule({
    imports: [UserModule, dbManager.getRootMongooseModule()],
  }).compile();

  userTestModule.get<UserService>(UserService);

  app = userTestModule.createNestApplication();
  await app.init();
});

beforeEach(async () => {
  await dbManager.seed('users', UserData);
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
  it('login successfully', async () => {
    const payload = {
      email: 'ibrahim@ibrahim.com',
      password: '123456',
    };
    const data = await request(app.getHttpServer())
      .post(`${controllerRoute}/login`)
      .send(payload);
    expect(data.status).toEqual(200);
  });

  it('login fail', async () => {
    const payload = {
      email: 'ibrahim@ibrahim.com',
      password: '12345',
    };
    const data = await request(app.getHttpServer())
      .post(`${controllerRoute}/login`)
      .send(payload);
    expect(data.status).toEqual(500);
  });

  it('register successfully', async () => {
    const payload = {
      name: 'İbrahim Şakar',
      email: 'ibrahim@ibrahim.com',
      password: '123456',
    };
    const data = await request(app.getHttpServer())
      .post(`${controllerRoute}/register`)
      .send(payload);
    expect(data.status).toEqual(200);
  });

  it('add friend successfully', async () => {
    const payload = {
      user: new ObjectId('64abc0599771025b8cd78fec'),
      friend: new ObjectId('64abc0599771025b8cd78fed'),
    };
    const data = await request(app.getHttpServer())
      .post(`${controllerRoute}/friend`)
      .send(payload);
    expect(data.status).toEqual(200);
  });
});
