import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  register(@Body() data: RegisterUserDto) {
    return this.usersService.register(data);
  }
}
