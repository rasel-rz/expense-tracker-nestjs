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
import { PersonInterface } from 'src/interface/person.interface';
import { PersonModel, UserModel } from 'src/model';
import { PersonService } from 'src/service/person.service';

@Controller('person')
export class PersonController {
  constructor(private readonly service: PersonService) {}

  @Get('/all')
  getAll(@Request() req): Promise<PersonInterface[]> {
    return this.service.findAll(req.user.id);
  }

  @Get()
  get(@Param() id): Promise<PersonInterface> {
    return this.service.findById(id);
  }

  @Post()
  create(@Body() model: PersonModel, @Request() req): Promise<PersonInterface> {
    model.user = new UserModel();
    model.user.id = req.user.id;
    return this.service.create(model);
  }

  @Put()
  update(@Body() model: PersonModel, @Param() id): Promise<PersonInterface> {
    return this.service.update(id, model);
  }

  @Delete()
  remove(@Param() id): Promise<PersonInterface> {
    return this.service.delete(id);
  }
}
