import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import {
  UserInterface,
  UserRepositoryInterface,
} from 'src/interface/user.interface';
import { Repository } from 'typeorm';

export class UserRepository implements UserRepositoryInterface {
  constructor(@InjectRepository(User) private userModel: Repository<User>) {}

  async findAll() {
    const users = await this.userModel.find();
    return users;
  }

  async create(user: UserInterface) {
    const newUser = new User();
    newUser.username = user.username;
    newUser.password = user.password;
    await this.userModel.save(newUser);
    return newUser;
  }

  async update(id: string, user: UserInterface) {
    const userToUpdate = await this.userModel.findOneBy({ id });
    if (!userToUpdate) {
      throw new Error('User not found');
    }
    userToUpdate.password = user.password;
    await this.userModel.save(userToUpdate);
    return userToUpdate;
  }

  async delete(id: string) {
    const userToDelete = await this.userModel.findOneBy({ id });
    if (!userToDelete) {
      throw new Error('User not found');
    }
    await this.userModel.delete(userToDelete);
    return userToDelete;
  }

  async findById(id: string) {
    const user = await this.userModel.findOne({
      where: { id },
      select: ['id', 'username'],
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.userModel.findOneBy({ username });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
