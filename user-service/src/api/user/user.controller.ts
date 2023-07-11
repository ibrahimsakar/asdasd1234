import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto, AddFriendDto } from 'src/dto';

@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'client register' })
  public async registerController(@Body() registerDto: RegisterDto) {
    return this.userService.registerService(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'client login' })
  public async loginController(@Body() loginDto: LoginDto) {
    return this.userService.loginService(loginDto);
  }

  @Post('friend')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'client login' })
  public async addFriendController(@Body() addFriendDto: AddFriendDto) {
    return this.userService.addFriendService(addFriendDto);
  }
}
