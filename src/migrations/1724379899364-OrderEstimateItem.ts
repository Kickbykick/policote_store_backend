import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateOrderEstimateItem1692739800000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "order_estimate_item" (
                "id" character varying NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "product_id" character varying NOT NULL,
                "quantity" integer NOT NULL,
                "order_estimate_id" character varying,
                CONSTRAINT "PK_order_estimate_item" PRIMARY KEY ("id")
            )
        `)

        await queryRunner.query(`
            ALTER TABLE "order_estimate_item"
            ADD CONSTRAINT "FK_order_estimate_item_order_estimate" FOREIGN KEY ("order_estimate_id") REFERENCES "order_estimate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order_estimate_item" DROP CONSTRAINT "FK_order_estimate_item_order_estimate"
        `)
        await queryRunner.query(`DROP TABLE "order_estimate_item"`)
    }
}