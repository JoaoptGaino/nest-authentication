import { Roles } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateRoleDto {
  @IsNotEmpty({ message: "'roles' are required" })
  @IsEnum(Roles, { each: true })
  roles: Roles[];
}
