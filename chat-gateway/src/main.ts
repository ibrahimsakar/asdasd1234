import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import InitSwagger from './bootstrap/swagger';
import { SocketIoAdapter } from './adapters/socketio.adapter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const socketIoAdapter = new SocketIoAdapter(app);
  await socketIoAdapter.connectToRedis(configService);
  InitSwagger(app, configService);
  app.useWebSocketAdapter(socketIoAdapter);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(configService.get('port'), configService.get('host'));
}
bootstrap();
