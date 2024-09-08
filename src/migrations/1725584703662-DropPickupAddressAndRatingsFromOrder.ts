import { MigrationInterface, QueryRunner } from "typeorm";

export class DropPickupAddressAndRatingsFromOrder1725584703662 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign key constraint and pickup_address_id column
    await queryRunner.query(`
      ALTER TABLE "order" DROP CONSTRAINT IF EXISTS "FK_order_pickup_address_id";
    `);
    await queryRunner.query(`
      ALTER TABLE "order" DROP COLUMN IF EXISTS "pickup_address_id";
    `);

    // Drop the ratings relationship
    await queryRunner.query(`
      ALTER TABLE "order" DROP CONSTRAINT IF EXISTS "FK_order_ratings";
    `);
    await queryRunner.query(`
      ALTER TABLE "order" DROP COLUMN IF EXISTS "ratings";
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Add the columns back in case of rollback
    await queryRunner.query(`
      ALTER TABLE "order" ADD COLUMN "pickup_address_id" varchar;
    `);

    await queryRunner.query(`
      ALTER TABLE "order" ADD CONSTRAINT "FK_order_pickup_address_id" FOREIGN KEY ("pickup_address_id") REFERENCES "address"("id");
    `);

    await queryRunner.query(`
      ALTER TABLE "order" ADD COLUMN "ratings" jsonb;
    `);

    await queryRunner.query(`
      ALTER TABLE "order" ADD CONSTRAINT "FK_order_ratings" FOREIGN KEY ("ratings") REFERENCES "rating"("id");
    `);
  }
}
