import { Injectable } from '@nestjs/common';
import { IUserInterface } from '../../../../src/interfaces/user.interface';

@Injectable()
export default class UserMockServiceCaller implements IUserInterface {
  async register(name: string, email: string, password: string): Promise<any> {
    return Promise.resolve();
  }

  async login(email: string, password: string): Promise<any> {
    if (password === '111111') {
      return Promise.reject();
    }
    return Promise.resolve();
  }

  async addFriend(user: string, friend: string): Promise<any> {
    return Promise.resolve();
  }
}
