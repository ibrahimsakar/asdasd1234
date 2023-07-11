import { ObjectId } from 'mongodb';
import MessageFactory from '../../factories/message.factory';

export default [
  MessageFactory.build({
    _id: new ObjectId('6491badef370dee26e9d19b6'),
    sender: new ObjectId('64abc0599771025b8cd78fec'),
    reciever: new ObjectId('64abc0599771025b8cd78fed'),
    status: 100,
    message: 'Rerum quia aliquam pariatur explicabo sint minima eos.'
  }),
  MessageFactory.build({
    _id: new ObjectId('6491badef370dee26e9d19b7'),
    sender: new ObjectId('64abc0599771025b8cd78fed'),
    reciever: new ObjectId('64abc0599771025b8cd78fec'),
    status: 100,
    message: 'Voluptatem repellat consequatur deleniti qui quibusdam harum cumque.'
  }),
];
