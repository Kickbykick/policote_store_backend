import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterDeliveryOrderExtensionDates1734312098106 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add new columns
        await queryRunner.query(`
            ALTER TABLE "delivery_order_extension"
            ADD COLUMN "pickup_at" TIMESTAMP WITH TIME ZONE,
            ADD COLUMN "delivery_at" TIMESTAMP WITH TIME ZONE
        `)

        // Drop old columns
        await queryRunner.query(`
            ALTER TABLE "delivery_order_extension"
            DROP COLUMN "pickup_time",
            DROP COLUMN "pickup_date",
            DROP COLUMN "delivery_time",
            DROP COLUMN "delivery_date"
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert changes if needed
        await queryRunner.query(`
            ALTER TABLE "delivery_order_extension"
            ADD COLUMN "pickup_time" TIMESTAMP,
            ADD COLUMN "pickup_date" TIMESTAMP,
            ADD COLUMN "delivery_time" TIMESTAMP,
            ADD COLUMN "delivery_date" TIMESTAMP
        `)

        await queryRunner.query(`
            UPDATE "delivery_order_extension"
            SET "pickup_time" = pickup_at,
            "pickup_date" = pickup_at::date,
            "delivery_time" = delivery_at,
            "delivery_date" = delivery_at::date
        `)

        await queryRunner.query(`
            ALTER TABLE "delivery_order_extension"
            DROP COLUMN "pickup_at",
            DROP COLUMN "delivery_at"
        `)
    }

}
