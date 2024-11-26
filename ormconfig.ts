import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();
const {
  DB_PORT = '',
  DB_HOST,
  DB_USER = '',
  DB_PASSWORD,
  DB_DATABASE = '',
} = process.env;

export default new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [__dirname + '/src/**/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: true,
  logging: true,
});
