import { Injectable } from '@nestjs/common';
import { IUserInterface } from "../../../../src/interfaces";
import { users } from '../data/users';

@Injectable()
export default class UserMockServiceCaller implements IUserInterface {
  async register(name: string, email: string, password: string): Promise<any> {
    return Promise.resolve();
  }

  async login(email: string, password: string): Promise<any> {
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      return Promise.resolve(user);
    }
    return Promise.reject();
  }

  async addFriend(user: string, friend: string): Promise<any> {
    return Promise.resolve();
  }
}
