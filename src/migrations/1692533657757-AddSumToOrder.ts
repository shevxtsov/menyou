import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddSumToOrder1692533657757 implements MigrationInterface {
    name = 'AddSumToOrder1692533657757'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "orders" ADD "sum" integer NOT NULL DEFAULT '0'`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "sum"`)
    }
}
