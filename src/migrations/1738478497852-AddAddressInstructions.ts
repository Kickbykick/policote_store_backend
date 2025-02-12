import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddressInstructions1738478497852 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "address"
            ADD COLUMN "pickup_instructions" jsonb NULL,
            ADD COLUMN "delivery_instructions" jsonb NULL
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "address"
            DROP COLUMN "pickup_instructions",
            DROP COLUMN "delivery_instructions"
        `)
    }
}
