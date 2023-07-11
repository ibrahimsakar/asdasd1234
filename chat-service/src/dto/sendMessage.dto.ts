import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  sender: string;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  reciever: string;

  @ApiProperty()
  @IsNotEmpty()
  message: string;
}
