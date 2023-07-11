import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import * as BB from 'bluebird';

class DbManager {
  server: MongoMemoryServer;

  connection: any;

  db: any;

  uri: string;

  async getUri() {
    return this.server.getUri();
  }

  async getDbName() {
    return this.server.instanceInfo.dbName;
  }

  async start() {
    this.server = await MongoMemoryServer.create();
    this.connection = await MongoClient.connect(this.server.getUri());
    this.db = this.connection.db(await this.server.instanceInfo.dbName);
    this.uri = this.server.getUri();
  }

  async stop() {
    await this.connection.close();
    return this.server.stop();
  }

  async cleanCollections() {
    const collections = await this.db.listCollections().toArray();
    await BB.each(collections, async (collection) => {
      if (collection.name.indexOf('system.') === -1) {
        await this.db.collection(collection.name).deleteMany({});
      }
    });
  }

  async seed(collection, data) {
    if (data.length > 0)
      await this.db
        .collection(collection)
        .insertMany(data)
        .catch((e) => console.log(e));
  }

  getRootMongooseModule(options: MongooseModuleOptions = {}) {
    return MongooseModule.forRootAsync({
      useFactory: async () => {
        return {
          uri: this.uri,
          ...options,
        };
      },
    });
  }
}

export default new DbManager();
