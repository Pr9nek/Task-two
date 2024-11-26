import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import * as dotenv from 'dotenv';

dotenv.config();
const { DB_PORT = '', DB_HOST, DB_USER = '', DB_PASSWORD, DB_DATABASE = ''} = process.env;


@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: '../.env',
    //   isGlobal: true,
    // }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: Number(DB_PORT),
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      entities: [User],
      synchronize: true,
    }),

    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
