import { MigrationInterface, QueryRunner } from "typeorm";

export class MakeProfileImageNullable1724281678559 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "profile"
            ALTER COLUMN "profile_image" DROP NOT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "profile"
            ALTER COLUMN "profile_image" SET NOT NULL;
        `);
    }
}
