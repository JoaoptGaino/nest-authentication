import { Roles, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity {
  id: string;
  name: string;
  username: string;
  email: string;

  @Exclude()
  password: string;

  createdAt: Date;
  updatedAt: Date;

  roles: Roles[];

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
    this.email = user.email;
    this.roles = user.roles;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
