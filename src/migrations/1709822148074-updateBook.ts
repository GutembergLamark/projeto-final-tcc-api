import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateBook1709822148074 implements MigrationInterface {
    name = 'UpdateBook1709822148074'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" ADD "available" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "books" DROP COLUMN "available"`);
    }

}
