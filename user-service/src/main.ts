import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import InitSwagger from './bootstrap/swagger';
import TimeoutInterceptor from './common/interceptor/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  InitSwagger(app, configService);
  app.useGlobalInterceptors(new TimeoutInterceptor(configService));
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(configService.get('port'), configService.get('host'));
}
bootstrap();
