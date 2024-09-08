import { MigrationInterface, QueryRunner } from "typeorm";

export class AddReferralCodeToProfile1724713929141 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "profile"
            ADD COLUMN "referral_code" character varying UNIQUE
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "profile"
            DROP COLUMN "referral_code"
        `)
    }
}
