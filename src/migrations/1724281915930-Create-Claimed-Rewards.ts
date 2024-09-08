import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateOrderEstimate1692739300000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "order_estimate" (
                "id" character varying NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "total" integer NOT NULL,
                CONSTRAINT "PK_7b3b9b4e5b4b4b4b4b4b4b4b4b" PRIMARY KEY ("id")
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "order_estimate"`)
    }
}