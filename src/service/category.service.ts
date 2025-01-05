import { Inject, Injectable } from '@nestjs/common';
import {
  CategoryInterface,
  CategoryRepositoryInterface,
} from 'src/interface/category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CategoryRepositoryInterface')
    private readonly categoryRepository: CategoryRepositoryInterface,
  ) {}

  async findAll(user_id: string) {
    return await this.categoryRepository.findAll(user_id);
  }

  async create(category: CategoryInterface) {
    return await this.categoryRepository.create(category);
  }

  async update(id: string, category: CategoryInterface) {
    return await this.categoryRepository.update(id, category);
  }

  async delete(id: string) {
    return await this.categoryRepository.delete(id);
  }

  async findById(id: string) {
    return await this.categoryRepository.findById(id);
  }
}
