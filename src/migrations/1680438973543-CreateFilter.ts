import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateFilter1680438973543 implements MigrationInterface {
    name = 'CreateFilter1680438973543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "filters" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_0a3564db8ce9b0dcb991598944c" PRIMARY KEY ("id"))`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "filters"`)
    }
}
