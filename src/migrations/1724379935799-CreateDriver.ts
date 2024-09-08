import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateDriver1692740100000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "driver_status_enum" AS ENUM('Active', 'Inactive')
        `)

        await queryRunner.query(`
            CREATE TABLE "driver" (
                "id" character varying NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "name" character varying NOT NULL,
                "license_number" character varying NOT NULL,
                "vehicle_type" character varying NOT NULL,
                "phone" character varying NOT NULL,
                "status" "driver_status_enum" NOT NULL DEFAULT 'Inactive',
                CONSTRAINT "PK_driver" PRIMARY KEY ("id")
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "driver"`)
        await queryRunner.query(`DROP TYPE "driver_status_enum"`)
    }
}