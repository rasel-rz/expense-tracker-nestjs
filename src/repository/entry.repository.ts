import { InjectRepository } from '@nestjs/typeorm';
import { Entry } from 'src/entity/entry.entity';
import {
  EntryInterface,
  EntryRepositoryInterface,
} from 'src/interface/entry.interface';
import { Repository } from 'typeorm';

export class EntryRepository implements EntryRepositoryInterface {
  constructor(@InjectRepository(Entry) private entryModel: Repository<Entry>) {}
  async findAll(): Promise<EntryInterface[]> {
    const entries = await this.entryModel.find({
      order: { updated_at: 'ASC' },
      relations: ['categories', 'persons'],
    });
    return entries;
  }

  async create(entry: EntryInterface): Promise<EntryInterface> {
    const newEntry = new Entry();
    newEntry.amount = entry.amount;
    newEntry.description = entry.description;
    newEntry.categories = entry.categories;
    newEntry.persons = entry.persons;
    newEntry.user = entry.user;
    await this.entryModel.save(newEntry);
    return newEntry;
  }

  async update(id: string, entry: EntryInterface): Promise<EntryInterface> {
    const entryToUpdate = await this.entryModel.findOneBy({ id });
    if (!entryToUpdate) {
      throw new Error('Entry not found');
    }
    entryToUpdate.amount = entry.amount;
    entryToUpdate.description = entry.description;
    await this.entryModel.save(entryToUpdate);
    return entryToUpdate;
  }

  async delete(id: string): Promise<EntryInterface> {
    const entryToDelete = await this.entryModel.findOneBy({ id });
    if (!entryToDelete) {
      throw new Error('Entry not found');
    }
    await this.entryModel.delete(entryToDelete);
    return entryToDelete;
  }

  async findById(id: string): Promise<EntryInterface> {
    const entry = await this.entryModel.findOne({
      where: { id },
      relations: ['categories', 'persons'],
    });
    if (!entry) {
      throw new Error('Entry not found');
    }
    return entry;
  }
}
