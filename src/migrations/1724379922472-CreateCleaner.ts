import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateCleaner1692740000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "cleaner" (
                "id" character varying NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "is_home_cleaner" boolean NOT NULL DEFAULT false,
                "is_commercial_cleaner" boolean NOT NULL DEFAULT false,
                CONSTRAINT "PK_cleaner" PRIMARY KEY ("id")
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cleaner"`)
    }
}