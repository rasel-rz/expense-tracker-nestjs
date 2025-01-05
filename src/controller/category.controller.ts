import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { CategoryInterface } from 'src/interface/category.interface';
import { CategoryModel } from 'src/model';
import { CategoryService } from 'src/service/category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get('/all')
  getAll(@Request() req): Promise<CategoryInterface[]> {
    return this.service.findAll(req.user.id);
  }

  @Get()
  get(@Param() id): Promise<CategoryInterface> {
    return this.service.findById(id);
  }

  @Post()
  create(
    @Body() model: CategoryModel,
    @Request() req,
  ): Promise<CategoryInterface> {
    model.user.id = req.user.id;
    return this.service.create(model);
  }

  @Put()
  update(
    @Body() model: CategoryModel,
    @Param() id,
  ): Promise<CategoryInterface> {
    return this.service.update(id, model);
  }

  @Delete()
  remove(@Param() id): Promise<CategoryInterface> {
    return this.service.delete(id);
  }
}
