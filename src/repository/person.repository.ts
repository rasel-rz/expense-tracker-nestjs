import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/entity/person.entity';
import {
  PersonInterface,
  PersonRepositoryInterface,
} from 'src/interface/person.interface';
import { Repository } from 'typeorm';

export class PersonRepository implements PersonRepositoryInterface {
  constructor(
    @InjectRepository(Person) private personModel: Repository<Person>,
  ) {}
  async findAll(): Promise<PersonInterface[]> {
    const persons = await this.personModel.find();
    return persons;
  }

  async create(person: PersonInterface): Promise<PersonInterface> {
    const newPerson = new Person();
    newPerson.name = person.name;
    newPerson.info = person.info;
    newPerson.avatar = person.avatar;
    newPerson.user = person.user;
    await this.personModel.save(newPerson);
    return newPerson;
  }

  async update(id: string, person: PersonInterface): Promise<PersonInterface> {
    const personToUpdate = await this.personModel.findOneBy({ id });
    if (!personToUpdate) {
      throw new Error('Person not found');
    }
    personToUpdate.name = person.name;
    personToUpdate.info = person.info;
    personToUpdate.avatar = person.avatar;
    await this.personModel.save(personToUpdate);
    return personToUpdate;
  }

  async delete(id: string): Promise<PersonInterface> {
    const personToDelete = await this.personModel.findOneBy({ id });
    if (!personToDelete) {
      throw new Error('Person not found');
    }
    await this.personModel.delete(personToDelete);
    return personToDelete;
  }

  async findById(id: string): Promise<PersonInterface> {
    const person = await this.personModel.findOneBy({ id });
    if (!person) {
      throw new Error('Person not found');
    }
    return person;
  }
}
