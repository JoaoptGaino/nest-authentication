import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users.service';
import { IPayload } from '../context/types';
import { PasswordService } from '../../users/services/password.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private passwordService: PasswordService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    const isPassword = await this.passwordService.comparePassword(
      password,
      user.password,
    );

    if (user && isPassword) {
      const { password, ...rest } = user;

      return rest;
    }

    return null;
  }

  async login(user: any) {
    const payload: IPayload = {
      name: user.name,
      sub: user.id,
      roles: user.roles,
    };

    return {
      acces_token: this.jwtService.sign(payload),
    };
  }
}
