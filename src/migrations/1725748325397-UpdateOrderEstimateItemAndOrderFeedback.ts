import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm"

export class UpdateOrderEstimateItemAndOrderFeedback1725748325397 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop product_id column from order_estimate_item table
        await queryRunner.dropColumn("order_estimate_item", "product_id")

        // Add lineitem_id column to order_estimate_item table
        await queryRunner.addColumn("order_estimate_item", new TableColumn({
            name: "line_item_id",
            type: "varchar",
            isNullable: false,
        }))

        // Remove order column and its constraints from order_feedback table
        await queryRunner.dropColumn("order_feedback", "order_id")

        // Add delivery_order_extension column to order_feedback table
        await queryRunner.addColumn("order_feedback", new TableColumn({
            name: "delivery_order_extension_id",
            type: "varchar",
            isNullable: false,
        }))

        // Add foreign key constraint for delivery_order_extension_id
        await queryRunner.createForeignKey("order_feedback", new TableForeignKey({
            columnNames: ["delivery_order_extension_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "delivery_order_extension",
            onDelete: "CASCADE"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert changes in case of rollback
        await queryRunner.dropForeignKey("order_feedback", "FK_order_feedback_delivery_order_extension")
        await queryRunner.dropColumn("order_feedback", "delivery_order_extension_id")
        await queryRunner.addColumn("order_feedback", new TableColumn({
            name: "order_id",
            type: "varchar",
            isNullable: false,
        }))
        await queryRunner.dropColumn("order_estimate_item", "line_item_id")
        await queryRunner.addColumn("order_estimate_item", new TableColumn({
            name: "product_id",
            type: "varchar",
            isNullable: false,
        }))
    }
}