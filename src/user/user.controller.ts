import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User, Role } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:userId')
  async getUser(@Param('userId') userId: number): Promise<User> {
    try {
      return this.userService.user({ userId: Number(userId) });
    } catch (error) {
      throw new Error();
    }
  }

  @Post('/create')
  async createUser(
    @Body()
    userData: {
      email: string;
      password: string;
      first_name: string;
      last_name: string;
      role?: Role;
      phoneNumber: string;
      note?: string;
    },
  ): Promise<User> {
    try {
      return;
    } catch (error) {
      throw error;
    }
  }
}
