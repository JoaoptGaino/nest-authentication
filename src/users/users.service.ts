import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'João Gaino',
      username: 'joaogaino',
      password: '1234',
    },
    {
      id: 2,
      name: 'João Gaino2',
      username: 'joaogaino2',
      password: '12345',
    },
  ];

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
