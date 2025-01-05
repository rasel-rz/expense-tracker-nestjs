import {
  IsAlphanumeric,
  IsNumber,
  IsOptional,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { GenericInterface } from './interface/generic.interface';
import { UserInterface } from './interface/user.interface';
import { PersonInterface } from './interface/person.interface';
import { Type } from 'class-transformer';
import { EntryInterface } from './interface/entry.interface';
import { CategoryInterface } from './interface/category.interface';

class GenericModel implements GenericInterface {
  @IsOptional()
  id: string;

  @IsOptional()
  created_at: Date;

  @IsOptional()
  updated_at: Date;

  @IsOptional()
  deleted_at: Date;
}

export class UserModel extends GenericModel implements UserInterface {
  @IsAlphanumeric()
  username: string;

  @MinLength(8)
  password: string;
}

export class PersonModel extends GenericModel implements PersonInterface {
  @MinLength(4)
  name: string;

  @IsOptional()
  info: string;

  @IsOptional()
  avatar: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UserModel)
  user: UserInterface;
}

export class EntryModel extends GenericModel implements EntryInterface {
  @IsNumber()
  amount: number;

  @IsOptional()
  description: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UserModel)
  user: UserInterface;

  @ValidateNested({ each: true })
  @Type(() => PersonModel)
  persons: PersonInterface[];

  @ValidateNested({ each: true })
  @Type(() => CategoryModel)
  categories: CategoryInterface[];
}

export class CategoryModel extends GenericModel implements CategoryInterface {
  @MinLength(4)
  name: string;

  @IsOptional()
  info: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UserModel)
  user: UserInterface;
}
