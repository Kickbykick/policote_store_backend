import { MigrationInterface, QueryRunner } from "typeorm";

//TODO: ? Add On CASCADE to the ALTER ORDER?
export class AlterCartTable1725584719761 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Alter Cart table
        await queryRunner.query(`
            ALTER TABLE "cart"
            ADD COLUMN "delivery_order_extension_id" character varying;
            
            ALTER TABLE "cart"
            ADD CONSTRAINT fk_delivery_order_extension FOREIGN KEY ("delivery_order_extension_id") REFERENCES "delivery_order_extension"("id");
        `);

        // Alter Order table
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD COLUMN "delivery_order_extension_id" character varying;
            
            ALTER TABLE "order"
            ADD CONSTRAINT fk_delivery_order_extension FOREIGN KEY ("delivery_order_extension_id") REFERENCES "delivery_order_extension"("id");
        `);

        // Alter Rating table
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD COLUMN "delivery_order_extension_id" character varying;
            
            ALTER TABLE "rating"
            ADD CONSTRAINT fk_delivery_order_extension FOREIGN KEY ("delivery_order_extension_id") REFERENCES "delivery_order_extension"("id");
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Revert changes to Cart table
        await queryRunner.query(`
            ALTER TABLE "cart"
            DROP CONSTRAINT fk_delivery_order_extension,
            DROP COLUMN "delivery_order_extension_id";
        `);

        // Revert changes to Order table
        await queryRunner.query(`
            ALTER TABLE "order"
            DROP CONSTRAINT fk_delivery_order_extension,
            DROP COLUMN "delivery_order_extension_id";
        `);

        // Revert changes to Rating table
        await queryRunner.query(`
            ALTER TABLE "rating"
            DROP CONSTRAINT fk_delivery_order_extension,
            DROP COLUMN "delivery_order_extension_id";
        `);
    }
}
