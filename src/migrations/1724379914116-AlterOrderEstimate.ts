import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterOrderEstimate1692739900000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // We don't need to add a column to OrderEstimate for the OneToMany relationship
        // The relationship is established through the foreign key in OrderEstimateItem
        // However, we can add an index to improve query performance if needed
        await queryRunner.query(`
            CREATE INDEX "IDX_order_estimate_id" ON "order_estimate_item" ("order_estimate_id")
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "IDX_order_estimate_id"
        `)
    }
}