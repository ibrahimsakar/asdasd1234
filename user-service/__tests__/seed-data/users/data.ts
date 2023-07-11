import { ObjectId } from 'mongodb';
import UserFactory from '../../factories/user';

export default [
  UserFactory.build({
    _id: new ObjectId('64abc0599771025b8cd78fec'),
    name: 'İbrahim Şakar',
    email: 'ibrahim@ibrahim.com',
    password: '123456',
  }),
  UserFactory.build({
    _id: new ObjectId('64abc0599771025b8cd78fed'),
    name: 'Ozan Şakar',
    email: 'ozan@ozan.com',
    password: '123456',
  }),
];
