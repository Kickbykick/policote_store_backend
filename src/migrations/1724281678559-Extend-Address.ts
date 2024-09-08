import { MigrationInterface, QueryRunner } from "typeorm";

export class ExtendAddress1724281678559 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1
                    FROM information_schema.columns
                    WHERE table_name='address' AND column_name='latitude'
                ) THEN
                    ALTER TABLE "address" ADD COLUMN "latitude" text;
                END IF;
            END
            $$;
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (
                    SELECT 1
                    FROM information_schema.columns
                    WHERE table_name='address' AND column_name='longitude'
                ) THEN
                    ALTER TABLE "address" ADD COLUMN "longitude" text;
                END IF;
            END
            $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE \"address\" DROP COLUMN \"latitude\"");
        await queryRunner.query("ALTER TABLE \"address\" DROP COLUMN \"longitude\"");
    }
}
