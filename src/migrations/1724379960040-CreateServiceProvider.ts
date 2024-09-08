import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateServiceProvider1692740400000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "service_provider_status_enum" AS ENUM('Active', 'Inactive')
        `)

        await queryRunner.query(`
            CREATE TYPE "service_type_enum" AS ENUM('Laundry', 'DryCleaning', 'Tailoring', 'Home Cleaning', 'Commercial Cleaning')
        `)

        await queryRunner.query(`
            CREATE TABLE "service_provider" (
                "id" character varying NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "name" character varying NOT NULL,
                "address" character varying NOT NULL,
                "phone" character varying NOT NULL,
                "type" "service_type_enum" NOT NULL DEFAULT 'DryCleaning',
                "status" "service_provider_status_enum" NOT NULL DEFAULT 'Inactive',
                CONSTRAINT "PK_service_provider" PRIMARY KEY ("id")
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "service_provider"`)
        await queryRunner.query(`DROP TYPE "service_type_enum"`)
        await queryRunner.query(`DROP TYPE "service_provider_status_enum"`)
    }
}