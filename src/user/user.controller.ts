import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, Role } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get('/:userId')
  @UseGuards(AuthGuard('local'))
  async getUser(@Param('userId') userId: number) {
    try {
      const user = await this.userService.user({ userId: Number(userId) });

      return user
        ? { data: user }
        : { message: `User Id ${userId} not found.` };
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
    },
  ): Promise<User> {
    try {
      const {
        email,
        password,
        first_name,
        last_name,
        phoneNumber,
        role,
      } = userData;
      const user_role = role ? role : 'USER';
      const new_user = await this.userService.createUser({
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        phoneNumber: phoneNumber,
        role: user_role,
        note: '',
        userStatus: 'UNAUTORIZED',
      });
      return new_user;
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }
}
