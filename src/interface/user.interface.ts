import {
  GenericInterface,
  GenericRepositoryInterface,
} from './generic.interface';

export interface UserInterface extends GenericInterface {
  username: string;
  password: string;
}

export interface UserRepositoryInterface
  extends GenericRepositoryInterface<UserInterface> {
  findByUsername(username: string): Promise<UserInterface>;
}
