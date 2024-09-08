import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterCustomer1692739500000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "customer"
            ADD COLUMN "profile_id" character varying,
            ADD COLUMN "order_estimate_id" character varying
        `)

        await queryRunner.query(`
            ALTER TABLE "customer"
            ADD CONSTRAINT "FK_customer_profile" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE,
            ADD CONSTRAINT "FK_customer_order_estimate" FOREIGN KEY ("order_estimate_id") REFERENCES "order_estimate"("id") ON DELETE CASCADE
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "customer"
            DROP CONSTRAINT "FK_customer_profile",
            DROP CONSTRAINT "FK_customer_order_estimate"
        `)

        await queryRunner.query(`
            ALTER TABLE "customer"
            DROP COLUMN "profile_id",
            DROP COLUMN "order_estimate_id"
        `)
    }
}