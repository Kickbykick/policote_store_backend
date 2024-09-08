import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateStoreStaff1692740300000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "job_role_enum" AS ENUM('front_desk', 'presser', 'tailor', 'manager', 'supervisor', 'associate', 'utility', 'cleaner')
        `)

        await queryRunner.query(`
            CREATE TYPE "job_type_enum" AS ENUM('on_call', 'contract', 'full_time', 'part_time')
        `)

        await queryRunner.query(`
            CREATE TABLE "store_staff" (
                "id" character varying NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "job_role" "job_role_enum" NOT NULL DEFAULT 'utility',
                "job_type" "job_type_enum" NOT NULL DEFAULT 'on_call',
                CONSTRAINT "PK_store_staff" PRIMARY KEY ("id")
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "store_staff"`)
        await queryRunner.query(`DROP TYPE "job_type_enum"`)
        await queryRunner.query(`DROP TYPE "job_role_enum"`)
    }
}