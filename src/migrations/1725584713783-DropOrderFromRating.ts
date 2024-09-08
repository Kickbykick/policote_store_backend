import { MigrationInterface, QueryRunner } from "typeorm";

export class DropOrderFromRating1725584713783 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign key constraint and order_id column
    await queryRunner.query(`
      ALTER TABLE "rating" DROP CONSTRAINT IF EXISTS "FK_rating_order_id";
    `);
    await queryRunner.query(`
      ALTER TABLE "rating" DROP COLUMN IF EXISTS "order_id";
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Add the columns back in case of rollback
    await queryRunner.query(`
      ALTER TABLE "rating" ADD COLUMN "order_id" varchar;
    `);

    await queryRunner.query(`
      ALTER TABLE "rating" ADD CONSTRAINT "FK_rating_order_id" FOREIGN KEY ("order_id") REFERENCES "order"("id");
    `);
  }
}
