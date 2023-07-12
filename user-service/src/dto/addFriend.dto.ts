import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddFriendDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  user: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  friend: string;
}
