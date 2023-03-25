import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRolerelationsBetweenUserAndRole1679657958794 implements MigrationInterface {
    name = 'CreateRolerelationsBetweenUserAndRole1679657958794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_role_list_roles" ("usersId" integer NOT NULL, "rolesId" integer NOT NULL, CONSTRAINT "PK_4688c71fc777124f9db247f9f9f" PRIMARY KEY ("usersId", "rolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_589e98f7dc62139ff4d4e78071" ON "users_role_list_roles" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a6bb16b163f73ad9866b0ddf80" ON "users_role_list_roles" ("rolesId") `);
        await queryRunner.query(`ALTER TABLE "users_role_list_roles" ADD CONSTRAINT "FK_589e98f7dc62139ff4d4e78071f" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_role_list_roles" ADD CONSTRAINT "FK_a6bb16b163f73ad9866b0ddf800" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_role_list_roles" DROP CONSTRAINT "FK_a6bb16b163f73ad9866b0ddf800"`);
        await queryRunner.query(`ALTER TABLE "users_role_list_roles" DROP CONSTRAINT "FK_589e98f7dc62139ff4d4e78071f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a6bb16b163f73ad9866b0ddf80"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_589e98f7dc62139ff4d4e78071"`);
        await queryRunner.query(`DROP TABLE "users_role_list_roles"`);
    }

}
