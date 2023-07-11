import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetMessagesDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  user: string;
}
