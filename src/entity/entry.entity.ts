import { EntryInterface } from 'src/interface/entry.interface';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';
import { Person } from './person.entity';

@Entity()
export class Entry implements EntryInterface {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @Column()
  amount: number;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User, (user) => user.entries)
  user: User;

  @ManyToMany(() => Category, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'entry_categories' })
  categories: Category[];

  @ManyToMany(() => Person, { onDelete: 'CASCADE' })
  @JoinTable({ name: 'entry_persons' })
  persons: Person[];
}
