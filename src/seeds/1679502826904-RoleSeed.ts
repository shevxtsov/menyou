import { MigrationInterface, QueryRunner } from 'typeorm'

export class RoleSeed1679502826904 implements MigrationInterface {
    name = 'RoleSeed1679502826904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO roles (code, name)
            VALUES('USER', 'Пользователь')
        `)
    }

    public async down(): Promise<void> {
        // no need
    }
}
