import { Inject, Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { MESSAGE_STATUSES } from 'src/common/constants';
import { IConnection, IChatInterface } from 'src/interfaces';

@Injectable()
export class SocketService {
  constructor(
    @Inject(IChatInterface)
    private chatServiceCaller: IChatInterface,
  ) {}

  public socket: Server = null;

  async sendOnlineEventToFriends(
    client: Socket,
    connections: Map<Socket, IConnection>,
  ) {
    const { friends } = this.getAuthenticatedUserData(client, connections);
    const onlineEvent = {
      userId: this.getUserId(client, connections),
    };
    client.emit('authenticated');
    for (const friend of friends) {
      if (connections.has(friend)) {
        friend.emit('online', onlineEvent);
      }
    }
  }

  async sendOfflineEventToFriends(
    client: Socket,
    friends: Socket[],
    connections: Map<Socket, IConnection>,
  ) {
    const offlineEvent = {
      userId: this.getUserId(client, connections),
    };

    for (const friend of friends) {
      if (connections.has(friend)) {
        friend.emit('offline', JSON.stringify(offlineEvent));
      }
    }
  }

  async updateMessageStatus(client: Socket, status, messageId) {
    await this.chatServiceCaller.update(messageId, status);
    client.emit(
      'message',
      JSON.stringify({
        type: 'update',
        messageId,
        status,
      }),
    );
  }

  async forwardMessageToFriends(
    client: Socket,
    connections: Map<Socket, IConnection>,
    message: string,
  ) {
    const { friends } = this.getAuthenticatedUserData(client, connections);
    const senderUserId = this.getUserId(client, connections);

    for (const friend of friends) {
      const friendData = connections.get(friend);
      const data = await this.chatServiceCaller.send(
        senderUserId,
        this.getUserId(friend, connections),
        message,
      );
      client.emit('messageSent');
      if (connections.has(friend)) {
        if (friendData.authenticated) {
          friend.emit(
            'message',
            JSON.stringify({
              type: 'message',
              sender: senderUserId,
              content: message,
              messageId: data._id,
              status: MESSAGE_STATUSES.SENT,
            }),
          );
          await this.chatServiceCaller.update(
            data._id,
            MESSAGE_STATUSES.DELIVERED,
          );
          client.emit('messageDelivered');
        }
      }
    }
  }

  getAuthenticatedUserData(
    client: Socket,
    connections: Map<Socket, IConnection>,
  ) {
    return connections.get(client);
  }

  getUserId(client: Socket, connections: Map<Socket, IConnection>) {
    const authenticatedUser = this.getAuthenticatedUserData(client, connections);
    if (authenticatedUser && authenticatedUser.userId) {
      return authenticatedUser.userId;
    }
    return;
  }
}
