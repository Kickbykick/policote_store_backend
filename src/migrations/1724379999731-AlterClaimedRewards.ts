import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterClaimedRewards1692740700000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "claimed_rewards"
            ADD COLUMN "user_points_balance_id" character varying
        `)

        await queryRunner.query(`
            ALTER TABLE "claimed_rewards"
            ADD CONSTRAINT "FK_claimed_rewards_user_points_balance" 
            FOREIGN KEY ("user_points_balance_id") 
            REFERENCES "user_points_balance"("id")
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "claimed_rewards"
            DROP CONSTRAINT "FK_claimed_rewards_user_points_balance"
        `)

        await queryRunner.query(`
            ALTER TABLE "claimed_rewards"
            DROP COLUMN "user_points_balance_id"
        `)
    }
}