import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddUserNameToCustomer1725476988425 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "customer",
            new TableColumn({
                name: "username",  // Name of the new column
                type: "varchar",           // Data type (you can change this to other types like "text", "integer", etc., as needed)
                isNullable: true,          // Whether the column can contain NULL values
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("customer", "username");
    }
}
