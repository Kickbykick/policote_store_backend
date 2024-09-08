import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterProfile1725427981895 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop the existing profile table and its dependencies
        await queryRunner.query(`
            ALTER TABLE IF EXISTS "store_staff" DROP CONSTRAINT IF EXISTS "fk_store_staff_profile";
            ALTER TABLE IF EXISTS "user_points_balance" DROP CONSTRAINT IF EXISTS "fk_user_points_balance_profile";
            ALTER TABLE IF EXISTS "claimed_rewards" DROP CONSTRAINT IF EXISTS "fk_claimed_rewards_profile";
            ALTER TABLE IF EXISTS "rating" DROP CONSTRAINT IF EXISTS "fk_rating_profile";
            DROP TABLE IF EXISTS "profile";
        `);

        await queryRunner.query(`
            CREATE TABLE "profile" (
                "id" character varying NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "is_partner" boolean NOT NULL DEFAULT false,
                "profile_image" character varying,
                CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id")
            )
        `)

        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD COLUMN "referral_code" character varying UNIQUE
        `)

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
        // Optionally, you can define how to revert this migration
        // For example, drop the table if it exists
        await queryRunner.query(`DROP TABLE IF EXISTS profile`);
    }
}
