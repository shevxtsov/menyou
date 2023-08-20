import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddPriceToMeal1692532716569 implements MigrationInterface {
    name = 'AddPriceToMeal1692532716569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "meals" ADD "price" integer NOT NULL DEFAULT '0'`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meals" DROP COLUMN "price"`)
    }
}
