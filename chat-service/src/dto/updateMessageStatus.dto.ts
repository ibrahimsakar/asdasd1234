import { IsNotEmpty, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageStatusDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  messageId: string;

  @ApiProperty()
  @IsNotEmpty()
  status: number;
}
