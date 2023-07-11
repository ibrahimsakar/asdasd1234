import { Inject, Injectable, Logger } from '@nestjs/common';
import { GetMessagesDto, RegisterDto, AddFriendDto } from 'src/dto';
import { IChatInterface, IUserInterface } from 'src/interfaces';

@Injectable()
export class ChatService {
  constructor(
    @Inject(IChatInterface)
    private chatService: IChatInterface,
    @Inject(IUserInterface)
    private userService: IUserInterface,
  ) {}

  private readonly logger = new Logger(ChatService.name);

  public async getMessagesService(getMessageDto: GetMessagesDto) {
    return this.chatService.getMessages(getMessageDto.user);
  }

  public async registerService(registerDto: RegisterDto) {
    return this.userService.register(
      registerDto.name,
      registerDto.email,
      registerDto.password,
    );
  }

  public async addFriendService(addFriendDto: AddFriendDto) {
    return this.userService.addFriend(addFriendDto.user, addFriendDto.friend);
  }
}
