import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateRelationsBetweenMealAndFilters1680494665924
    implements MigrationInterface
{
    name = 'CreateRelationsBetweenMealAndFilters1680494665924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE "meals_filter_list_filters" ("mealsId" integer NOT NULL, "filtersId" integer NOT NULL, CONSTRAINT "PK_12332920329e77e1532e66eb702" PRIMARY KEY ("mealsId", "filtersId"))`)
        await queryRunner.query(`
        CREATE INDEX "IDX_2a9ff8030c22e8c92ea8801e09" ON "meals_filter_list_filters" ("mealsId") `)
        await queryRunner.query(`
        CREATE INDEX "IDX_8d03a366a73a01b0c520bb1a3f" ON "meals_filter_list_filters" ("filtersId") `)
        await queryRunner.query(`
        ALTER TABLE "meals_filter_list_filters" ADD CONSTRAINT "FK_2a9ff8030c22e8c92ea8801e09a" FOREIGN KEY ("mealsId") REFERENCES "meals"("id") ON DELETE CASCADE ON UPDATE CASCADE`)
        await queryRunner.query(`
        ALTER TABLE "meals_filter_list_filters" ADD CONSTRAINT "FK_8d03a366a73a01b0c520bb1a3fd" FOREIGN KEY ("filtersId") REFERENCES "filters"("id") ON DELETE CASCADE ON UPDATE CASCADE`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        ALTER TABLE "meals_filter_list_filters" DROP CONSTRAINT "FK_8d03a366a73a01b0c520bb1a3fd"`)
        await queryRunner.query(`
        ALTER TABLE "meals_filter_list_filters" DROP CONSTRAINT "FK_2a9ff8030c22e8c92ea8801e09a"`)
        await queryRunner.query(`
        DROP INDEX "public"."IDX_8d03a366a73a01b0c520bb1a3f"`)
        await queryRunner.query(`
        DROP INDEX "public"."IDX_2a9ff8030c22e8c92ea8801e09"`)
        await queryRunner.query(`
        DROP TABLE "meals_filter_list_filters"`)
    }
}
