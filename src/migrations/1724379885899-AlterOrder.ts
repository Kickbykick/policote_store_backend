import { MigrationInterface, QueryRunner } from "typeorm"

export class AlterOrder1692739700000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD COLUMN "pickup_address_id" character varying
        `)

        await queryRunner.query(`
            CREATE INDEX "IDX_order_pickup_address" ON "order" ("pickup_address_id")
        `)

        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_order_pickup_address" FOREIGN KEY ("pickup_address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_order_pickup_address"
        `)

        await queryRunner.query(`
            DROP INDEX "IDX_order_pickup_address"
        `)

        await queryRunner.query(`
            ALTER TABLE "order" DROP COLUMN "pickup_address_id"
        `)
    }
}