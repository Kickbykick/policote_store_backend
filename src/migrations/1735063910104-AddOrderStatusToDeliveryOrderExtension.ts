import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderStatusToDeliveryOrderExtension1735063910104 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create enum type first
        await queryRunner.query(`
            CREATE TYPE "order_status_ext_enum" AS ENUM(
                'pending',
                'order_confirmed', 
                'driver_pickup_transit',
                'processing',
                'cleaning',
                'ready',
                'delivery_transit',
                'delivered'
            )
        `)

        // Add column using the enum
        await queryRunner.query(`
            ALTER TABLE "delivery_order_extension"
            ADD COLUMN "order_status" order_status_enum NOT NULL DEFAULT 'pending'
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove column first
        await queryRunner.query(`
            ALTER TABLE "delivery_order_extension" 
            DROP COLUMN "order_status"
        `)

        // Then remove enum type
        await queryRunner.query(`
            DROP TYPE "order_status_ext_enum"
        `)
    }

}
