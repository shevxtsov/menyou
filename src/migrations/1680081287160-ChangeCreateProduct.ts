import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeCreateProduct1680081287160 implements MigrationInterface {
    name = 'ChangeCreateProduct1680081287160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "products" ALTER COLUMN "description" SET DEFAULT ''`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "products" ALTER COLUMN "description" DROP DEFAULT`)
    }
}
