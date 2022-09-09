import { Prisma } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';

export class FindAllUsersDto extends PaginationQueryDto<Prisma.UserOrderByWithRelationInput> {
  @IsOptional()
  @IsString({ message: "'name' must be a string" })
  name?: string;

  @IsOptional()
  @IsString({ message: "'username' must be a string" })
  username?: string;

  @IsOptional()
  @IsString({ message: "'email' must be a string" })
  email?: string;
}
