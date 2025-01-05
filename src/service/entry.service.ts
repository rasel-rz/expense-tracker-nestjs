import { Inject, Injectable } from '@nestjs/common';
import {
  EntryInterface,
  EntryRepositoryInterface,
} from 'src/interface/entry.interface';

@Injectable()
export class EntryService {
  constructor(
    @Inject('EntryRepositoryInterface')
    private readonly entryRepository: EntryRepositoryInterface,
  ) {}

  async findAll(user_id: string) {
    return await this.entryRepository.findAll(user_id);
  }

  async create(entry: EntryInterface) {
    return await this.entryRepository.create(entry);
  }

  async update(id: string, entry: EntryInterface) {
    return await this.entryRepository.update(id, entry);
  }

  async delete(id: string) {
    return await this.entryRepository.delete(id);
  }

  async findById(id: string) {
    return await this.entryRepository.findById(id);
  }
}
