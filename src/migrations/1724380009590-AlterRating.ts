import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterRating1692740800000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD COLUMN "service_provider_id" character varying,
            ADD COLUMN "profile_id" character varying
        `)

        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD CONSTRAINT "FK_rating_service_provider" FOREIGN KEY ("service_provider_id") REFERENCES "service_provider"("id")
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "rating"
            DROP CONSTRAINT "FK_rating_service_provider"
        `)

        await queryRunner.query(`
            ALTER TABLE "rating"
            DROP COLUMN "service_provider_id"
        `)
    }
}