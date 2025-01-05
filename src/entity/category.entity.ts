import { CategoryInterface } from 'src/interface/category.interface';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Entry } from './entry.entity';

@Entity()
export class Category implements CategoryInterface {
  @PrimaryGeneratedColumn('uuid')
  @Index()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  info: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToOne(() => User, (user) => user.categories)
  user: User;

  @ManyToMany(() => Entry, (entry) => entry.persons)
  entries?: Entry[];
}
