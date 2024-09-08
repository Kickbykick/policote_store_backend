import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTailor1692740200000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "tailor_status_enum" AS ENUM('Active', 'Inactive')
        `)

        await queryRunner.query(`
            CREATE TABLE "tailor" (
                "id" character varying NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "name" character varying NOT NULL,
                "shop_name" character varying NOT NULL,
                "experience_years" integer NOT NULL,
                "specialties" character varying NOT NULL,
                "address" character varying NOT NULL,
                "phone" character varying NOT NULL,
                "status" "tailor_status_enum" NOT NULL DEFAULT 'Inactive',
                CONSTRAINT "PK_tailor" PRIMARY KEY ("id")
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tailor"`)
        await queryRunner.query(`DROP TYPE "tailor_status_enum"`)
    }
}