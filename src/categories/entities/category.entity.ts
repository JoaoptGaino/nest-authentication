import { Category } from '@prisma/client';

export class CategoryEntity {
  id: string;
  name: string;

  createdAt: Date;
  updatedAt: Date;

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
    this.createdAt = category.createdAt;
    this.updatedAt = category.updatedAt;
  }
}
