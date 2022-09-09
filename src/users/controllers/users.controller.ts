import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/common/decorators/public.decorator';
import { RolesDecorator } from 'src/common/decorators/roles.decorator';
import { FindAllUsersDto } from '../dtos/find-all-users.dto';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { UpdateRoleDto } from '../dtos/update-role.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  register(@Body() data: RegisterUserDto) {
    return this.usersService.register(data);
  }

  @Patch()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator(Roles.ADMIN)
  updateRoles(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.usersService.updateRoles(id, updateRoleDto);
  }

  @Get()
  findAll(@Query() query: FindAllUsersDto) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }
}
