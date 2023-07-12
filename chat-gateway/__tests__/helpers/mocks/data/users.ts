import { ObjectId } from 'mongodb';

export const users = [
  {
    _id: new ObjectId('64ad60d503a6f4db6eb216cd'),
    name: 'İbrahim Şakar',
    email: 'ibrahim@ibrahim.com',
    password: '123456',
    friends: [ new ObjectId('64ad77606ed9388d487d8990')],
  },
  {
    _id: new ObjectId('64ad77606ed9388d487d8990'),
    name: 'Ozan Şakar',
    email: 'ozan@ozan.com',
    password: '123456',
    friends: [ new ObjectId('64ad60d503a6f4db6eb216cd')],
  },
];
