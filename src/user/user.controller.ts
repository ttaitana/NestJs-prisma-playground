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
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/gard/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/gard/local-auth.gard';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@Request() req) {
    try {
      const { password, ...user } = await this.userService.user({
        userId: Number(req.user.userId),
      });

      return user
        ? { data: user }
        : { message: `User Id ${req.user.userId} not found.` };
    } catch (error) {
      return { message: error.message };
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

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req): Promise<any> {
    try {
      return this.authService.login(req.user);
    } catch (error) {
      return { message: error.message };
    }
  }
}
