import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserModel } from 'src/dataAccess/schemas';
import { UserRepository } from 'src/dataAccess/repositories';

@Module({
  imports: [
    MongooseModule.forFeature([UserModel]),
    HttpModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export default class UserModule {}
