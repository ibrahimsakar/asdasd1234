import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<UserDocument>,
  ) {}

  registerDB(query) {
    return this.UserModel.create(query);
  }

  getUserDB(query) {
    return this.UserModel.findOne(query).populate('friends');
  }

  async addFriend(query) {
    const user = await this.UserModel.findById({ _id: query.user });
    user.friends.push(query.friend);
    await user.save();
    return user;
  }
}
