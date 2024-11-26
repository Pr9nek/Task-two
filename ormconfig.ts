import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const {
  DB_PORT = '',
  DB_HOST,
  DB_USER = '',
  DB_PASSWORD,
  DB_DATABASE = '',
} = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  // entities: [__dirname + '/src/**/*.entity.{ts,js}'],
  // migrations: [__dirname + '/migrations/*.{ts,js}'],
  entities: [path.join(__dirname, '/src/**/*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '/migrations/*.{ts,js}')],
  synchronize: false,
  logging: true,
});
