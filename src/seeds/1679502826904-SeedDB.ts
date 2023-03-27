import { MigrationInterface, QueryRunner } from 'typeorm'

export class SeedDB1679502826904 implements MigrationInterface {
    name = 'SeedDB1679502826904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO users (username, firstname, lastname, is_admin, is_blocked, image, password)
            VALUES('admin', 'Администратор', '', 'true', 'false', '', '$2b$10$UKtFa7H1jLaZkmZYMHMIhOzbDBjWUAFF3vCS.QuVORTiOkSfeW0ca')
        `)
    }

    public async down(): Promise<void> {
        // no need
    }
}
