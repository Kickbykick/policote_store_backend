import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameIsPartnerColumn1725408488674 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Check if the column 'isPartner' exists
        const columnExists = await queryRunner.hasColumn('profile', 'isPartner');

        if (columnExists) {
            // Rename 'isPartner' column to 'is_partner'
            await queryRunner.query(`ALTER TABLE "profile" RENAME COLUMN "isPartner" TO "is_partner"`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Check if the column 'is_partner' exists
        const columnExists = await queryRunner.hasColumn('profile', 'is_partner');

        if (columnExists) {
            // Rename 'is_partner' column back to 'isPartner'
            await queryRunner.query(`ALTER TABLE "profile" RENAME COLUMN "is_partner" TO "isPartner"`);
        }
    }
}
