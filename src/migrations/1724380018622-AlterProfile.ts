import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterProfile1692740900000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD COLUMN "user_points_balance_id" character varying,
            ADD COLUMN "customer_id" character varying,
            ADD COLUMN "store_staff_id" character varying,
            ADD COLUMN "cleaner_id" character varying,
            ADD COLUMN "driver_id" character varying,
            ADD COLUMN "tailor_id" character varying,
            ADD COLUMN "service_provider_id" character varying
        `)

        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD CONSTRAINT "FK_profile_user_points_balance" FOREIGN KEY ("user_points_balance_id") REFERENCES "user_points_balance"("id"),
            ADD CONSTRAINT "FK_profile_customer" FOREIGN KEY ("customer_id") REFERENCES "customer"("id"),
            ADD CONSTRAINT "FK_profile_store_staff" FOREIGN KEY ("store_staff_id") REFERENCES "store_staff"("id"),
            ADD CONSTRAINT "FK_profile_cleaner" FOREIGN KEY ("cleaner_id") REFERENCES "cleaner"("id"),
            ADD CONSTRAINT "FK_profile_driver" FOREIGN KEY ("driver_id") REFERENCES "driver"("id"),
            ADD CONSTRAINT "FK_profile_tailor" FOREIGN KEY ("tailor_id") REFERENCES "tailor"("id"),
            ADD CONSTRAINT "FK_profile_service_provider" FOREIGN KEY ("service_provider_id") REFERENCES "service_provider"("id")
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "profile"
            DROP CONSTRAINT "FK_profile_user_points_balance",
            DROP CONSTRAINT "FK_profile_customer",
            DROP CONSTRAINT "FK_profile_store_staff",
            DROP CONSTRAINT "FK_profile_cleaner",
            DROP CONSTRAINT "FK_profile_driver",
            DROP CONSTRAINT "FK_profile_tailor",
            DROP CONSTRAINT "FK_profile_service_provider"
        `)

        await queryRunner.query(`
            ALTER TABLE "profile"
            DROP COLUMN "user_points_balance_id",
            DROP COLUMN "customer_id",
            DROP COLUMN "store_staff_id",
            DROP COLUMN "cleaner_id",
            DROP COLUMN "driver_id",
            DROP COLUMN "tailor_id",
            DROP COLUMN "service_provider_id"
        `)
    }
}