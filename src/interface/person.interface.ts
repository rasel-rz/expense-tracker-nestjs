import {
  GenericInterface,
  GenericRepositoryInterface,
} from './generic.interface';
import { UserInterface } from './user.interface';

export interface PersonInterface extends GenericInterface {
  name: string;
  info: string;
  avatar: string;
  user: UserInterface;
}
export interface PersonRepositoryInterface
  extends GenericRepositoryInterface<PersonInterface> {}
