import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateReward1692739400000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "reward_source_enum" AS ENUM('order', 'referral', 'promotion', 'other')
        `)
        
        await queryRunner.query(`
            CREATE TABLE "reward" (
                "id" character varying NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "name" character varying NOT NULL,
                "description" text NOT NULL,
                "source" "reward_source_enum" NOT NULL DEFAULT 'order',
                "points_required" integer NOT NULL,
                "valid_until" TIMESTAMP,
                CONSTRAINT "PK_9752a9104326edc046a5a04c1d7" PRIMARY KEY ("id")
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "reward"`)
        await queryRunner.query(`DROP TYPE "reward_source_enum"`)
    }
}