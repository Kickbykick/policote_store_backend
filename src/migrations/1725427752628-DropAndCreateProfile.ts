import { MigrationInterface, QueryRunner } from "typeorm";

export class DropAndCreateProfile1725427752628 implements MigrationInterface {
    name = 'UpdateProfileTable1693789000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop the existing profile table and its dependencies
        await queryRunner.query(`
            ALTER TABLE IF EXISTS "store_staff" DROP CONSTRAINT IF EXISTS "fk_store_staff_profile";
            ALTER TABLE IF EXISTS "user_points_balance" DROP CONSTRAINT IF EXISTS "fk_user_points_balance_profile";
            ALTER TABLE IF EXISTS "claimed_rewards" DROP CONSTRAINT IF EXISTS "fk_claimed_rewards_profile";
            ALTER TABLE IF EXISTS "rating" DROP CONSTRAINT IF EXISTS "fk_rating_profile";
            DROP TABLE IF EXISTS "profile";
        `);

        // Create the new profile table
        await queryRunner.query(`
            CREATE TABLE "profile" (
                "id" VARCHAR PRIMARY KEY,
                "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(),
                "is_partner" BOOLEAN DEFAULT false,
                "profile_image" VARCHAR,
                "referral_code" VARCHAR NOT NULL,
                "total_points" INTEGER NOT NULL,
                "service_provider_id" VARCHAR,
                "tailor_id" VARCHAR,
                "driver_id" VARCHAR,
                "cleaner_id" VARCHAR
            )
        `);

        // Add foreign key constraints
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD CONSTRAINT "fk_profile_service_provider"
            FOREIGN KEY ("service_provider_id")
            REFERENCES "service_provider"("id")
            ON DELETE SET NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD CONSTRAINT "fk_profile_tailor"
            FOREIGN KEY ("tailor_id")
            REFERENCES "tailor"("id")
            ON DELETE SET NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD CONSTRAINT "fk_profile_driver"
            FOREIGN KEY ("driver_id")
            REFERENCES "driver"("id")
            ON DELETE SET NULL
        `);

        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD CONSTRAINT "fk_profile_cleaner"
            FOREIGN KEY ("cleaner_id")
            REFERENCES "cleaner"("id")
            ON DELETE SET NULL
        `);

        // Add foreign key for store_staff
        await queryRunner.query(`
            ALTER TABLE "store_staff"
            ADD CONSTRAINT "fk_store_staff_profile"
            FOREIGN KEY ("id")
            REFERENCES "profile"("id")
            ON DELETE CASCADE
        `);

        // Add foreign key for user_points_balance
        await queryRunner.query(`
            ALTER TABLE "user_points_balance"
            ADD CONSTRAINT "fk_user_points_balance_profile"
            FOREIGN KEY ("id")
            REFERENCES "profile"("id")
            ON DELETE CASCADE
        `);

        // Add foreign key for claimed_rewards
        await queryRunner.query(`
            ALTER TABLE "claimed_rewards"
            ADD CONSTRAINT "fk_claimed_rewards_profile"
            FOREIGN KEY ("user_points_balance_id")
            REFERENCES "profile"("id")
            ON DELETE CASCADE
        `);

        // Add foreign key for rating
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD CONSTRAINT "fk_rating_profile"
            FOREIGN KEY ("profile_id")
            REFERENCES "profile"("id")
            ON DELETE CASCADE
        `);

        // Create index for faster lookups
        await queryRunner.query(`
            CREATE INDEX "idx_profile_referral_code"
            ON "profile"("referral_code")
        `);

        console.log("Profile table has been dropped and recreated with the new schema.");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign keys
        await queryRunner.query(`ALTER TABLE "store_staff" DROP CONSTRAINT IF EXISTS "fk_store_staff_profile"`);
        await queryRunner.query(`ALTER TABLE "user_points_balance" DROP CONSTRAINT IF EXISTS "fk_user_points_balance_profile"`);
        await queryRunner.query(`ALTER TABLE "claimed_rewards" DROP CONSTRAINT IF EXISTS "fk_claimed_rewards_profile"`);
        await queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT IF EXISTS "fk_rating_profile"`);
        
        // Drop foreign keys on profile table
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT IF EXISTS "fk_profile_service_provider"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT IF EXISTS "fk_profile_tailor"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT IF EXISTS "fk_profile_driver"`);
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT IF EXISTS "fk_profile_cleaner"`);

        // Drop index
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_profile_referral_code"`);

        // Drop the profile table
        await queryRunner.query(`DROP TABLE IF EXISTS "profile"`);

        console.log("Updated Profile table has been dropped.");
    }
}