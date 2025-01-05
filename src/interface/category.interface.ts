import {
  GenericInterface,
  GenericRepositoryInterface,
} from './generic.interface';
import { UserInterface } from './user.interface';

export interface CategoryInterface extends GenericInterface {
  name: string;
  info: string;
  user: UserInterface;
}
export interface CategoryRepositoryInterface
  extends GenericRepositoryInterface<CategoryInterface> {}
