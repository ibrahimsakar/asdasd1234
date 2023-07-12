import { Inject, Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from 'src/modules/socket/socket.service';
import { IConnection, IUserInterface } from 'src/interfaces';

const connections = new Map<Socket, IConnection>();

@WebSocketGateway({
  cors: true,
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private socketService: SocketService,
    @Inject(IUserInterface)
    private userService: IUserInterface,
  ) {}

  @WebSocketServer() public server: Server;
  private logger: Logger = new Logger(EventsGateway.name);

  afterInit(server: Server) {
    this.socketService.socket = server;
  }

  handleConnection(client: Socket) {
    this.logger.log(`User connected: ${client.id}`);
    client.on('authenticate', async ({ email, password }) => {
      const user = await this.userService.login(email, password).catch(() => {});
      if (user) {
        connections.set(client, {
          authenticated: true,
          userId: user._id,
          friends: user.friends,
          pendingMessages: user.pendingMessages,
        });
        await this.socketService.sendOnlineEventToFriends(client, connections);
      } else {
        client.emit('authenticationFailed');
        client.disconnect();
      }
    });

    client.on('message', async ({ message }) => {
      await this.socketService.forwardMessageToFriends(
        client,
        connections,
        message,
      );
    });
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`User disconnected: ${client.id}`);
    if (connections.has(client)) {
      const { friends } = connections.get(client);
      connections.delete(client);
      this.socketService.sendOfflineEventToFriends(
        client,
        friends,
        connections,
      );
    }
  }
}
