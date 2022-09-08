import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersController } from './controllers/users.controller';
import { PasswordService } from './services/password.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, PasswordService],
  exports: [UsersService, PasswordService],
})
export class UsersModule {}
