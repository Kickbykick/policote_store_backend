import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AlterDeliveryOrderExtensionAddFields1725584727123 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add pickup_address_id to delivery_order_extension table
        await queryRunner.addColumn(
            "delivery_order_extension",
            new TableColumn({
                name: "pickup_address_id",
                type: "character varying",
                isNullable: true,
            })
        );

        // Add ratings to delivery_order_extension table (handled as a relation, no need for a column)
        await queryRunner.createForeignKey(
            "rating",
            new TableForeignKey({
                columnNames: ["delivery_order_extension_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "delivery_order_extension",
                onDelete: "CASCADE",
            })
        );

        // Add cart relation to delivery_order_extension
        await queryRunner.addColumn(
            "delivery_order_extension",
            new TableColumn({
                name: "cart_id",
                type: "character varying",
                isNullable: true,
            })
        );

        await queryRunner.createForeignKey(
            "delivery_order_extension",
            new TableForeignKey({
                columnNames: ["cart_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "cart",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove foreign key and column for cart
        const cartForeignKey = await queryRunner.getTable("delivery_order_extension");
        const foreignKey = cartForeignKey!.foreignKeys.find(fk => fk.columnNames.indexOf("cart_id") !== -1);
        await queryRunner.dropForeignKey("delivery_order_extension", foreignKey!);
        await queryRunner.dropColumn("delivery_order_extension", "cart_id");

        // Remove foreign key for ratings
        const ratingForeignKey = await queryRunner.getTable("rating");
        const ratingFk = ratingForeignKey!.foreignKeys.find(fk => fk.columnNames.indexOf("delivery_order_extension_id") !== -1);
        await queryRunner.dropForeignKey("rating", ratingFk!);

        // Remove pickup_address_id
        await queryRunner.dropColumn("delivery_order_extension", "pickup_address_id");
    }
}
