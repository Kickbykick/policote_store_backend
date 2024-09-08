import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUserPointsBalance1692740600000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user_points_balance" (
                "id" character varying NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP WITH TIME ZONE,
                "total_points" integer NOT NULL,
                "profile_id" character varying,
                CONSTRAINT "PK_user_points_balance" PRIMARY KEY ("id"),
                CONSTRAINT "FK_user_points_balance_profile" FOREIGN KEY ("profile_id") REFERENCES "profile"("id")
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_points_balance"`)
    }
}