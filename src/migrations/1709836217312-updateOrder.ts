import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrder1709836217312 implements MigrationInterface {
    name = 'UpdateOrder1709836217312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "time" TO "days"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "days"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "days" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "days"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "days" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" RENAME COLUMN "days" TO "time"`);
    }

}
