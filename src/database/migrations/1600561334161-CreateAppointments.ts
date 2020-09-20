import { MigrationInterface, QueryRunner, Table } from 'typeorm';

/*
 * Para que o UUID seja gerado automaticamente no PostgreSQL, é necessário
 * executar os seguintes comandos no psql:
 *              \c <database_name>
 *              create extension if not exists "uuid-ossp";
 */

export default class CreateAppointments1600561334161
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
