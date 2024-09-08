import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameProfileIdCustomerTable1725400968439 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Check if the 'profie_id' column exists
        const hasProfieIdColumn = await queryRunner.hasColumn("customer", "profie_id");

        if (hasProfieIdColumn) {
            // Rename the column to 'profile_id'
            await queryRunner.query(`ALTER TABLE customer RENAME COLUMN "profie_id" TO "profile_id";`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Check if the 'profile_id' column exists
        const hasProfileIdColumn = await queryRunner.hasColumn("customer", "profile_id");

        if (hasProfileIdColumn) {
            // Revert the column name to 'profie_id'
            await queryRunner.query(`ALTER TABLE customer RENAME COLUMN "profile_id" TO "profie_id";`);
        }
    }
}
