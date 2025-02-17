import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDriverInstructions1739636944275 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "delivery_order_extension" 
                ADD COLUMN "driver_instructions" jsonb NULL`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "delivery_order_extension" 
                DROP COLUMN "driver_instructions"`
        )
    }
}
