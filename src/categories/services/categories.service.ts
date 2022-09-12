import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { getPaginationQueryData } from 'src/common/pagination-query.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { FindAllCategoriesDto } from '../dto/find-all-categories.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateCategoryDto): Promise<CategoryEntity> {
    const category = await this.prismaService.category.create({
      data,
    });

    return new CategoryEntity(category);
  }

  async findAll({
    name,
    ...query
  }: FindAllCategoriesDto): Promise<FindAllReturn> {
    const where: Prisma.CategoryWhereInput = {
      name: { contains: name, mode: 'insensitive' },
    };

    const totalCount = await this.prismaService.category.count({ where });

    const categories = await this.prismaService.category.findMany({
      ...getPaginationQueryData(query),
      orderBy: query.sort,
      where,
    });

    const entities = categories.map((category) => new CategoryEntity(category));

    return {
      totalCount,
      entities,
    };
  }

  async findOne(id: string): Promise<CategoryEntity> {
    const category = await this.prismaService.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException();
    }

    return new CategoryEntity(category);
  }

  async update(id: string, data: UpdateCategoryDto): Promise<CategoryEntity> {
    const updatedUser = await this.prismaService.category.update({
      where: { id },
      data,
    });

    return new CategoryEntity(updatedUser);
  }

  async remove(id: string): Promise<CategoryEntity> {
    const category = await this.prismaService.category.delete({
      where: { id },
    });

    return new CategoryEntity(category);
  }
}
