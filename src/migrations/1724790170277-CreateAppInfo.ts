import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateAppInfo1693160100000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "app_info" (
                "id" character varying NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "terms_conditions_url" character varying NOT NULL,
                "privacy_policy_url" character varying NOT NULL,
                "faq_page_url" character varying NOT NULL,
                "about_page_url" character varying NOT NULL,
                CONSTRAINT "PK_app_info" PRIMARY KEY ("id")
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "app_info"`)
    }
}