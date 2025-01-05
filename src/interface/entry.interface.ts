import {
  GenericInterface,
  GenericRepositoryInterface,
} from './generic.interface';
import { CategoryInterface } from './category.interface';
import { PersonInterface } from './person.interface';
import { UserInterface } from './user.interface';

export interface EntryInterface extends GenericInterface {
  amount: number;
  description: string;
  persons: PersonInterface[];
  categories: CategoryInterface[];
  user: UserInterface;
}
export interface EntryRepositoryInterface
  extends GenericRepositoryInterface<EntryInterface> {}
