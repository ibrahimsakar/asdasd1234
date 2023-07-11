import { ObjectId } from 'mongodb';

export const messages = [
  {
    _id: new ObjectId(),
    sender: new ObjectId(),
    reciever: new ObjectId('643661dc8bc2f9c755904737'),
    status: 100,
    message: 'Soluta deserunt eos quam reiciendis libero autem enim nam ut.',
  },
  {
    _id: new ObjectId(),
    sender: new ObjectId(),
    reciever: new ObjectId('643661dc8bc2f9c755904737'),
    status: 100,
    message: 'Error dolorem natus quos eum consequatur necessitatibus.',
  },
];
