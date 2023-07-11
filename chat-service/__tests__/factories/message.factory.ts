import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';

export interface MessageInterface {
  _id: ObjectId;
  status: number,
  sender: ObjectId;
  reciever: ObjectId;
  message: string;
}

export default Factory.Sync.makeFactory<MessageInterface>({
  _id: new ObjectId(),
  status: faker.number.int(),
  sender: new ObjectId(),
  reciever: new ObjectId(),
  message: faker.lorem.sentence(5),
});
