import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateClaimedRewards1692740500000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "claim_status_enum" AS ENUM('pending', 'redeemed', 'expired')
        `)

        await queryRunner.query(`
            CREATE TABLE "claimed_rewards" (
                "id" character varying NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "reward_id" character varying NOT NULL,
                "points_used" integer NOT NULL,
                "status" "claim_status_enum" NOT NULL DEFAULT 'pending',
                "claimed_at" TIMESTAMP WITH TIME ZONE NOT NULL,
                CONSTRAINT "PK_claimed_rewards" PRIMARY KEY ("id")
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "claimed_rewards"`)
        await queryRunner.query(`DROP TYPE "claim_status_enum"`)
    }
}