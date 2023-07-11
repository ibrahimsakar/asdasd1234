/* eslint-disable */
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
class MongoService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMongooseOptions():
  | Promise<MongooseModuleOptions>
  | MongooseModuleOptions {

    return {
      uri: this.configService.get('mongoDb'),
    };
  }
}

export default MongoService;
