import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

type Body = {
  email: string;
  password: string;
};

type Req = {
  body: Body;
};
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      passReqToCallback: true,
      usernameField: 'email',
    }); //strategy's config. Local doesnt need any configs, but others might
  }

  async validate(req: Req) {
    const user = await this.authService.validateUser(
      req.body.email,
      req.body.password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
