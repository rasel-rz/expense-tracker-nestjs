import { UserInterface } from 'src/interface/user.interface';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Person } from './person.entity';
import { Entry } from './entry.entity';

@Entity()
export class User implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @OneToMany(() => Category, (category) => category.user)
  categories?: Category[];

  @OneToMany(() => Person, (person) => person.user)
  persons?: Person[];

  @OneToMany(() => Entry, (entry) => entry.user)
  entries?: Entry[];
}
