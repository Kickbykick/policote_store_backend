import { MigrationInterface, QueryRunner } from "typeorm";

export class AddServiceProviderToDeliveryOrderExtension1725604832954 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "delivery_order_extension"
            ADD COLUMN "service_provider_id" character varying,
            ADD CONSTRAINT "FK_delivery_order_extension_service_provider" FOREIGN KEY ("service_provider_id") REFERENCES "service_provider"("id") ON DELETE SET NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "delivery_order_extension"
            DROP CONSTRAINT "FK_delivery_order_extension_service_provider",
            DROP COLUMN "service_provider_id";
        `);
    }
}
