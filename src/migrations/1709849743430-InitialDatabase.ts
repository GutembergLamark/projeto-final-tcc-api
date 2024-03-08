import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDatabase1709849743430 implements MigrationInterface {
    name = 'InitialDatabase1709849743430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_44fba34a7052127480dde32f290"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "UQ_44fba34a7052127480dde32f290" UNIQUE ("bookId")`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_44fba34a7052127480dde32f290" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_44fba34a7052127480dde32f290"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "UQ_44fba34a7052127480dde32f290"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_44fba34a7052127480dde32f290" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
