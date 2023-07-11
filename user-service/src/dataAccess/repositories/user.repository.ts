import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, Friendship, FriendshipDocument } from '../schemas';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<UserDocument>,
    @InjectModel(Friendship.name)
    private readonly FriendshipModel: Model<FriendshipDocument>,
  ) {}

  registerDB(query) {
    return this.UserModel.create(query);
  }

  getUserDB(query) {
    return this.UserModel.findOne(query).populate('friends');
  }

  addFriend(query) {
    return this.FriendshipModel.create(query);
  }
}
