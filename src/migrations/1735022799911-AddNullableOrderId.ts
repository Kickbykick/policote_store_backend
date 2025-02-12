import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNullableOrderId1735022799911 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "delivery_order_extension"
            ALTER COLUMN "order_id" DROP NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "delivery_order_extension"
            ALTER COLUMN "order_id" SET NOT NULL
        `);
    }
}
