import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';

export interface UserInterface {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
}

export default Factory.Sync.makeFactory<UserInterface>({
  _id: new ObjectId(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.lorem.word(6),
});
