import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveServiceProviderFromRating1725604810941 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "rating"
            DROP CONSTRAINT IF EXISTS "FK_rating_service_provider",
            DROP COLUMN "service_provider_id";
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD COLUMN "service_provider_id" character varying,
            ADD CONSTRAINT "FK_rating_service_provider" FOREIGN KEY ("service_provider_id") REFERENCES "service_provider"("id") ON DELETE CASCADE;
        `);
    }
}
