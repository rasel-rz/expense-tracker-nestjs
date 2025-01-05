import { Inject, Injectable } from '@nestjs/common';
import {
  PersonInterface,
  PersonRepositoryInterface,
} from 'src/interface/person.interface';

@Injectable()
export class PersonService {
  constructor(
    @Inject('PersonRepositoryInterface')
    private readonly personRepository: PersonRepositoryInterface,
  ) {}

  async findAll(user_id: string) {
    return await this.personRepository.findAll(user_id);
  }

  async create(person: PersonInterface) {
    return await this.personRepository.create(person);
  }

  async update(id: string, person: PersonInterface) {
    return await this.personRepository.update(id, person);
  }

  async delete(id: string) {
    return await this.personRepository.delete(id);
  }

  async findById(id: string) {
    return await this.personRepository.findById(id);
  }
}
