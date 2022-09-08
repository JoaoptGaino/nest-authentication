import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { IPayload } from './context/types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (user && user.password === password) {
      const { password, username, ...rest } = user;
      return rest;
    }

    return null;
  }

  async login(user: any) {
    const payload: IPayload = {
      name: user.name,
      sub: user.id,
    };

    return {
      acces_token: this.jwtService.sign(payload),
    };
  }
}
