import { Roles } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @Exclude()
  id?: string;

  @IsOptional()
  @IsString({ message: "'name' must be a string" })
  name?: string;

  @IsOptional()
  @IsString({ message: "'username' must be a string" })
  username?: string;

  @IsOptional()
  @IsString({ message: "'email' must be a string" })
  email?: string;

  @IsOptional()
  @IsEnum(Roles, { each: true })
  roles: Roles[];
}
