import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameProfileImageAndReferralCodeColumns1725409174125 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Check and rename 'profileImage' to 'profile_image'
        const profileImageExists = await queryRunner.hasColumn('profile', 'profileImage');
        if (profileImageExists) {
            await queryRunner.query(`ALTER TABLE "profile" RENAME COLUMN "profileImage" TO "profile_image"`);
        }

        // Check and rename 'referralCode' to 'referral_code'
        const referralCodeExists = await queryRunner.hasColumn('profile', 'referralCode');
        if (referralCodeExists) {
            await queryRunner.query(`ALTER TABLE "profile" RENAME COLUMN "referralCode" TO "referral_code"`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Check and rename 'profile_image' back to 'profileImage'
        const profileImageExists = await queryRunner.hasColumn('profile', 'profile_image');
        if (profileImageExists) {
            await queryRunner.query(`ALTER TABLE "profile" RENAME COLUMN "profile_image" TO "profileImage"`);
        }

        // Check and rename 'referral_code' back to 'referralCode'
        const referralCodeExists = await queryRunner.hasColumn('profile', 'referral_code');
        if (referralCodeExists) {
            await queryRunner.query(`ALTER TABLE "profile" RENAME COLUMN "referral_code" TO "referralCode"`);
        }
    }
}
