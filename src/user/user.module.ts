import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  exports: [UserService],
})
export class UserModule {}
