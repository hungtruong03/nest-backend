import { Controller, Post, Get, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body() userDto: UserDto) {
    return await this.userService.register(userDto);
  }

  @Get('get')
  async getUsers() {
    return await this.userService.find();
  }
}