import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateMeal1680087286656 implements MigrationInterface {
    name = 'CreateMeal1680087286656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "meals" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "image" character varying NOT NULL DEFAULT '', "is_blocked" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_e6f830ac9b463433b58ad6f1a59" PRIMARY KEY ("id"))`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "meals"`)
    }
}
