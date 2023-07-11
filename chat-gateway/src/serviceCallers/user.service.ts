import { Injectable } from '@nestjs/common';
import ServiceCaller from './serviceCaller';
import { SERVICES } from 'src/common/constants';
import { IUserInterface } from 'src/interfaces';

@Injectable()
export default class UserServiceCaller implements IUserInterface {
  constructor(private readonly serviceCaller: ServiceCaller) {}

  async login(email: string, password: string) {
    return this.serviceCaller.request(SERVICES.USER, 'POST', 'users/login', {
      email,
      password,
    });
  }

  async register(name: string, email: string, password: string): Promise<any> {
    return this.serviceCaller.request(SERVICES.USER, 'POST', 'users/register', {
      name,
      email,
      password,
    });
  }

  async addFriend(userId: string, friendId: string): Promise<any> {
    return this.serviceCaller.request(
      SERVICES.USER,
      'POST',
      'users/add-friend',
      {
        userId,
        friendId,
      },
    );
  }
}
