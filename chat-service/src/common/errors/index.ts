import { HttpException, HttpStatus } from '@nestjs/common';
import { ERRORS } from './messages';

export class ServiceCallerException extends HttpException {
  constructor(message: string) {
    super(
      { message, ...ERRORS.SERVICE_CALLER_ERROR },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
