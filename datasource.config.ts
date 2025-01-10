import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
dotenv.config();

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT, NODE_ENV } = process.env;
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: parseInt(DB_PORT),
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  ssl: true,
  entities: ['src/entity/**.ts'],
  migrations: ['src/migrations/*-mig.ts'],
});
