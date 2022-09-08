import { User } from '@prisma/client';
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

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.username = user.username;
    this.email = user.email;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
