import { Inject, Injectable } from '@nestjs/common';
import {
  UserInterface,
  UserRepositoryInterface,
} from 'src/interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async findAll(user_id: string) {
    return await this.userRepository.findAll(user_id);
  }

  async create(user: UserInterface) {
    return await this.userRepository.create(user);
  }

  async update(id: string, user: UserInterface) {
    return await this.userRepository.update(id, user);
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }

  async findById(id: string) {
    return await this.userRepository.findById(id);
  }

  async findByUsername(username: string) {
    return await this.userRepository.findByUsername(username);
  }
}
