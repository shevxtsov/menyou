import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateUser1679502826904 implements MigrationInterface {
    name = 'CreateUser1679502826904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "is_admin" boolean NOT NULL DEFAULT false, "is_blocked" boolean NOT NULL DEFAULT false, "image" character varying NOT NULL DEFAULT '', "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`)
    }
}
