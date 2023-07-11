import { Socket } from 'socket.io';

export interface IConnection {
  authenticated: boolean;
  userId: string;
  friends: Socket[];
  pendingMessages: { sender: string; content: string }[];
}
