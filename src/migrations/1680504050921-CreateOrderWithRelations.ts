import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateOrderWithRelations1680504050921
    implements MigrationInterface
{
    name = 'CreateOrderWithRelations1680504050921'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "orders" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'CREATED', "is_active" boolean NOT NULL DEFAULT true, "cooking_time" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "end_time" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`)
        await queryRunner.query(`
        CREATE TABLE "orders_meal_list_meals" ("ordersId" integer NOT NULL, "mealsId" integer NOT NULL, CONSTRAINT "PK_bb4f8b52d1c1afa7c7080dfa210" PRIMARY KEY ("ordersId", "mealsId"))`)
        await queryRunner.query(`
        CREATE INDEX "IDX_e0f1f9bb30291c7fe787360de5" ON "orders_meal_list_meals" ("ordersId") `)
        await queryRunner.query(`
        CREATE INDEX "IDX_00ab7b3821964cb42161772c6d" ON "orders_meal_list_meals" ("mealsId") `)
        await queryRunner.query(`
        ALTER TABLE "orders" ADD CONSTRAINT "FK_37a00f7df9edf56340e668fea51" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await queryRunner.query(`
        ALTER TABLE "orders_meal_list_meals" ADD CONSTRAINT "FK_e0f1f9bb30291c7fe787360de59" FOREIGN KEY ("ordersId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE`)
        await queryRunner.query(`
        ALTER TABLE "orders_meal_list_meals" ADD CONSTRAINT "FK_00ab7b3821964cb42161772c6d1" FOREIGN KEY ("mealsId") REFERENCES "meals"("id") ON DELETE CASCADE ON UPDATE CASCADE`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "orders_meal_list_meals" DROP CONSTRAINT "FK_00ab7b3821964cb42161772c6d1"`)
        await queryRunner.query(`
        ALTER TABLE "orders_meal_list_meals" DROP CONSTRAINT "FK_e0f1f9bb30291c7fe787360de59"`)
        await queryRunner.query(`
        ALTER TABLE "orders" DROP CONSTRAINT "FK_37a00f7df9edf56340e668fea51"`)
        await queryRunner.query(`
        DROP INDEX "public"."IDX_00ab7b3821964cb42161772c6d"`)
        await queryRunner.query(`
        DROP INDEX "public"."IDX_e0f1f9bb30291c7fe787360de5"`)
        await queryRunner.query(`DROP TABLE "orders_meal_list_meals"`)
        await queryRunner.query(`DROP TABLE "orders"`)
    }
}
