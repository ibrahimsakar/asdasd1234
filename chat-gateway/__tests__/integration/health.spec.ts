import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import HealthModule from '../../src/api/health/health.module';
import { HealthService } from '../../src/api/health/health.service';

const controllerRoute = '/health';

let app: INestApplication;

beforeAll(async () => {
  const healthTestModule: TestingModule = await Test.createTestingModule({
    imports: [HealthModule],
  }).compile();

  healthTestModule.get<HealthService>(HealthService);

  app = healthTestModule.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await app.close();
});

jest.setTimeout(100000);

describe('Health tests', () => {
  it('get successfully health', async () => {
    const data = await request(app.getHttpServer()).get(controllerRoute);
    expect(data.status).toEqual(200);
  });

  it('get successfully health readiness', async () => {
    const data = await request(app.getHttpServer()).get(
      controllerRoute + '/readiness',
    );

    expect(data.status).toEqual(200);
  });

  it('get successfully health liveness', async () => {
    const data = await request(app.getHttpServer()).get(
      controllerRoute + '/liveness',
    );

    expect(data.status).toEqual(200);
  });
});
