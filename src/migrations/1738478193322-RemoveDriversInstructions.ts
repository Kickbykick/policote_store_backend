import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveDriversInstructions1738478193322 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "delivery_order_extension"
            DROP COLUMN "drivers_instructions"
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "delivery_order_extension"
            ADD COLUMN "drivers_instructions" text[] NULL
        `)
    }
}
