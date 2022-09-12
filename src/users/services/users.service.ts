import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { getPaginationQueryData } from 'src/common/pagination-query.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordService } from 'src/users/services/password.service';
import { FindAllUsersDto } from '../dtos/find-all-users.dto';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
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

  async findAll({
    email,
    name,
    username,
    ...query
  }: FindAllUsersDto): Promise<FindAllReturn> {
    const where: Prisma.UserWhereInput = {
      name: { contains: name, mode: 'insensitive' },
      email: { contains: email, mode: 'insensitive' },
      username: { contains: username, mode: 'insensitive' },
    };

    const totalCount = await this.prismaService.user.count({ where });

    const users = await this.prismaService.user.findMany({
      ...getPaginationQueryData(query),
      orderBy: query.sort,
      where,
    });

    const entities = users.map((user) => new UserEntity(user));

    return {
      totalCount,
      entities,
    };
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    return new UserEntity(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async update(id: string, data: UpdateUserDto): Promise<UserEntity> {
    const user = await this.prismaService.user.update({
      where: { id },
      data,
    });

    return new UserEntity(user);
  }

  async updateRoles(id: string, { roles }: UpdateRoleDto) {
    const user = await this.prismaService.user.update({
      where: { id },
      data: {
        roles,
      },
    });
    return new UserEntity(user);
  }
}
