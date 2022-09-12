import { Prisma } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';

export class FindAllCategoriesDto extends PaginationQueryDto<Prisma.CategoryOrderByWithRelationInput> {
  @IsOptional()
  @IsString({ message: "'name' must be a string" })
  name?: string;
}
