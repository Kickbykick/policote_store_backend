import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProfileTable1725423699473 implements MigrationInterface {
    name = 'CreateProfileTable1693788000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Check if the table already exists
        const tableExistsQuery = `
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'profile'
            );
        `;
        const result = await queryRunner.query(tableExistsQuery);
        const tableExists = result[0].exists;

        if (!tableExists) {
            // Create the profile table
            await queryRunner.query(`
                CREATE TABLE "profile" (
                    "id" VARCHAR PRIMARY KEY,
                    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    "deleted_at" TIMESTAMP,
                    "is_partner" BOOLEAN DEFAULT FALSE,
                    "profile_image" VARCHAR,
                    "referral_code" VARCHAR NOT NULL,
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

            // Create index for faster lookups
            await queryRunner.query(`
                CREATE INDEX "idx_profile_referral_code"
                ON "profile"("referral_code")
            `);

            console.log("Profile table and its relations have been created successfully.");
        } else {
            console.log("Profile table already exists. Skipping table creation.");
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign keys
        await queryRunner.query(`
            ALTER TABLE "store_staff" DROP CONSTRAINT IF EXISTS "fk_store_staff_profile"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_points_balance" DROP CONSTRAINT IF EXISTS "fk_user_points_balance_profile"
        `);
        
        // Drop foreign keys on profile table
        await queryRunner.query(`
            ALTER TABLE "profile" DROP CONSTRAINT IF EXISTS "fk_profile_service_provider"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile" DROP CONSTRAINT IF EXISTS "fk_profile_tailor"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile" DROP CONSTRAINT IF EXISTS "fk_profile_driver"
        `);
        await queryRunner.query(`
            ALTER TABLE "profile" DROP CONSTRAINT IF EXISTS "fk_profile_cleaner"
        `);

        // Drop index
        await queryRunner.query(`
            DROP INDEX IF EXISTS "idx_profile_referral_code"
        `);

        // Drop the profile table
        await queryRunner.query(`
            DROP TABLE IF EXISTS "profile"
        `);

        console.log("Profile table and its relations have been rolled back.");
    }
}