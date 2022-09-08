import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordService } from 'src/users/services/password.service';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private passwordService: PasswordService,
  ) {}

  async register(data: RegisterUserDto): Promise<UserEntity> {
    const password = await this.passwordService.hashPassword(data.password);

    const createdUser = await this.prismaService.user.create({
      data: {
        ...data,
        password,
      },
    });

    return new UserEntity(createdUser);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
