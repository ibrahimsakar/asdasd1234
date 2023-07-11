import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from 'src/dataAccess/repositories/user.repository';
import { RegisterDto, LoginDto, AddFriendDto } from 'src/dto';

@Injectable()
export class UserService {
  constructor(private UserDataAccess: UserRepository) {}

  private readonly logger = new Logger(UserService.name);

  public async registerService(registerDto: RegisterDto) {
    return this.UserDataAccess.registerDB(registerDto);
  }

  public async loginService(loginDto: LoginDto) {
    const client = await this.UserDataAccess.getUserDB(loginDto);
    if (!client) {
      throw new Error('There is no client with this information');
    }
    return client;
  }

  public async addFriendService(addFriendDto: AddFriendDto) {
    return this.UserDataAccess.addFriend(addFriendDto);
  }
}
