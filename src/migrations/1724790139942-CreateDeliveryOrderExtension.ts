import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateDeliveryOrderExtension1693160000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "delivery_order_extension" (
                "id" character varying NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "order_id" character varying NOT NULL,
                "pickup_time" TIMESTAMP WITH TIME ZONE NOT NULL,
                "pickup_date" TIMESTAMP WITH TIME ZONE NOT NULL,
                "delivery_time" TIMESTAMP WITH TIME ZONE NOT NULL,
                "delivery_date" TIMESTAMP WITH TIME ZONE NOT NULL,
                "drivers_instructions" text[],
                "garment_instructions" jsonb,
                CONSTRAINT "PK_delivery_order_extension" PRIMARY KEY ("id"),
                CONSTRAINT "UQ_delivery_order_extension_order_id" UNIQUE ("order_id"),
                CONSTRAINT "FK_delivery_order_extension_order" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "delivery_order_extension"`)
    }
}