import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import MongoModule from 'src/modules/mongo/mongo.module';
import MessageModule from 'src/api/message/message.module';
import HealthModule from './api/health/health.module';
import configuration from 'src/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('THROTTLE_TTL'),
        limit: config.get('THROTTLE_LIMIT'),
      }),
    }),
    MongoModule,
    MessageModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
