import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class SeedUsers1688888888888 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    // Заполняем таблицу users миллионом записей
    const users = [];
    for (let i = 1; i <= 1000000; i++) {
      users.push({
        firstName: `FirstName${i}`,
        lastName: `LastName${i}`,
        age: Math.floor(Math.random() * 60) + 18, // возраст от 18 до 78
        gender: Math.random() > 0.5 ? 'male' : 'female',
        hasProblems: Math.random() > 0.8, // ~20% пользователей с проблемами
      });
    }

    // Вставляем данные чанками для оптимизации
    const chunkSize = 10000; // Вставлять по 10,000 записей за раз
    for (let i = 0; i < users.length; i += chunkSize) {
      const chunk = users.slice(i, i + chunkSize);
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into('users') // Указание таблицы для вставки
        .values(chunk) // Вставляем данные
        .execute();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Удалить таблицу users
    await queryRunner.dropTable('users');
  }
}
