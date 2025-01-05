import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entity/category.entity';
import {
  CategoryInterface,
  CategoryRepositoryInterface,
} from 'src/interface/category.interface';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryRepository implements CategoryRepositoryInterface {
  constructor(
    @InjectRepository(Category) private categoryModel: Repository<Category>,
  ) {}

  async findAll(user_id: string): Promise<CategoryInterface[]> {
    const categories = await this.categoryModel.find({
      where: { user: { id: user_id } },
    });
    return categories;
  }

  async create(category: CategoryInterface): Promise<CategoryInterface> {
    const newCategory = new Category();
    newCategory.name = category.name;
    newCategory.info = category.info;
    newCategory.user = category.user;
    await this.categoryModel.save(newCategory);
    return newCategory;
  }

  async update(
    id: string,
    category: CategoryInterface,
  ): Promise<CategoryInterface> {
    const categoryToUpdate = await this.categoryModel.findOneBy({ id });
    if (!categoryToUpdate) {
      throw new Error('Category not found');
    }
    categoryToUpdate.name = category.name;
    categoryToUpdate.info = category.info;
    await this.categoryModel.save(categoryToUpdate);
    return categoryToUpdate;
  }

  async delete(id: string): Promise<CategoryInterface> {
    const categoryToDelete = await this.categoryModel.findOneBy({ id });
    if (!categoryToDelete) {
      throw new Error('Category not found');
    }
    await this.categoryModel.delete(categoryToDelete);
    return categoryToDelete;
  }

  async findById(id: string): Promise<CategoryInterface> {
    const category = await this.categoryModel.findOneBy({ id });
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  }
}
