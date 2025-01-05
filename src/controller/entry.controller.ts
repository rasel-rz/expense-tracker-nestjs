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
import { EntryInterface } from 'src/interface/entry.interface';
import { EntryModel, UserModel } from 'src/model';
import { EntryService } from 'src/service/entry.service';

@Controller('entry')
export class EntryController {
  constructor(private readonly service: EntryService) {}

  @Get('/all')
  getAll(@Request() req): Promise<EntryInterface[]> {
    return this.service.findAll(req.user.id);
  }

  @Get()
  get(@Param() id): Promise<EntryInterface> {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() model: EntryModel, @Request() req): Promise<EntryInterface> {
    model.user = new UserModel();
    model.user.id = req.user.id;
    return this.service.create(model);
  }

  @Put()
  update(@Body() model: EntryModel, @Param() id): Promise<EntryInterface> {
    return this.service.update(id, model);
  }

  @Delete()
  remove(@Param() id): Promise<EntryInterface> {
    return this.service.delete(id);
  }
}
