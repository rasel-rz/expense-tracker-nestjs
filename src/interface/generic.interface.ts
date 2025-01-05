export interface GenericInterface {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface GenericRepositoryInterface<T> {
  findAll(user_id: string): Promise<T[]>;
  create(entity: T): Promise<T>;
  update(id: string, entity: T): Promise<T>;
  delete(id: string): Promise<T>;
  findById(id: string): Promise<T>;
}
