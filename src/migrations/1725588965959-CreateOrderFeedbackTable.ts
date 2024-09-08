import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrderFeedbackTable1725588965959 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "issue_type_enum" AS ENUM('About Delivery', 'About Quality', 'Customer Service', 'Other')
        `)

        await queryRunner.query(`
            CREATE TABLE "order_feedback" (
                "id" character varying NOT NULL,
                "order_id" character varying NOT NULL,
                "customer_id" character varying NOT NULL,
                "type" "issue_type_enum" NOT NULL DEFAULT 'Other',
                "description" text NOT NULL,
                "attachment_urls" text[] DEFAULT '{}',
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                CONSTRAINT "PK_order_feedback_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_order_feedback_order" FOREIGN KEY ("order_id")
                    REFERENCES "order" ("id") ON DELETE CASCADE,
                CONSTRAINT "FK_order_feedback_customer" FOREIGN KEY ("customer_id")
                    REFERENCES "customer" ("id")
            );

            CREATE INDEX "IDX_order_feedback_order_id" ON "order_feedback" ("order_id");
            CREATE INDEX "IDX_order_feedback_customer_id" ON "order_feedback" ("customer_id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order_feedback"
            DROP CONSTRAINT "FK_order_feedback_order",
            DROP CONSTRAINT "FK_order_feedback_customer"
        `)

        await queryRunner.query(`
            DROP INDEX "IDX_order_feedback_order_id";
            DROP INDEX "IDX_order_feedback_customer_id";
            DROP TABLE "order_feedback";
        `);
    }
}
