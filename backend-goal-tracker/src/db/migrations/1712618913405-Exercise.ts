import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Exercise1712618913405 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'exercise',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'exerciseType',
                    type: 'varchar',
                },
                {
                    name: 'distance',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'time',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'repetitions',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'resistance',
                    type: 'varchar',
                    isNullable: true,
                },
                {
                    name: 'dateCreated',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);

        // either repetitions or distance must not be null
        await queryRunner.query(`
        ALTER TABLE "exercise"
        ADD CONSTRAINT "CHK_distance_time_repetitions" CHECK (
            (distance IS NOT NULL AND time IS NOT NULL AND repetitions IS NULL) OR 
            (distance IS NULL AND time IS NULL AND repetitions IS NOT NULL)
        )
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercise" DROP CONSTRAINT "CHK_distance_time_repetitions"`);
        await queryRunner.dropTable('exercise');
    }
}
