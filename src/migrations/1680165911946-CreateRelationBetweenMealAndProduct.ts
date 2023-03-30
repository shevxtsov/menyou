import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateRelationBetweenMealAndProduct1680165911946
    implements MigrationInterface
{
    name = 'CreateRelationBetweenMealAndProduct1680165911946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "meals_product_list_products" ("mealsId" integer NOT NULL, "productsId" integer NOT NULL, CONSTRAINT "PK_92eaebeb287c82ddd5d4cb94567" PRIMARY KEY ("mealsId", "productsId"))`)
        await queryRunner.query(`
        CREATE INDEX "IDX_b4591458d456c8e2592351084a" ON "meals_product_list_products" ("mealsId") `)
        await queryRunner.query(`
        CREATE INDEX "IDX_c263adf8f7ae013f509899768b" ON "meals_product_list_products" ("productsId") `)
        await queryRunner.query(`
        ALTER TABLE "meals_product_list_products" ADD CONSTRAINT "FK_b4591458d456c8e2592351084a1" FOREIGN KEY ("mealsId") REFERENCES "meals"("id") ON DELETE CASCADE ON UPDATE CASCADE`)
        await queryRunner.query(`
        ALTER TABLE "meals_product_list_products" ADD CONSTRAINT "FK_c263adf8f7ae013f509899768be" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "meals_product_list_products" DROP CONSTRAINT "FK_c263adf8f7ae013f509899768be"`)
        await queryRunner.query(`
        ALTER TABLE "meals_product_list_products" DROP CONSTRAINT "FK_b4591458d456c8e2592351084a1"`)
        await queryRunner.query(`
        DROP INDEX "public"."IDX_c263adf8f7ae013f509899768b"`)
        await queryRunner.query(`
        DROP INDEX "public"."IDX_b4591458d456c8e2592351084a"`)
        await queryRunner.query(`DROP TABLE "meals_product_list_products"`)
    }
}
