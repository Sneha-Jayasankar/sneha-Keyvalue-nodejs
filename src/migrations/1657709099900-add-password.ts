import {MigrationInterface, QueryRunner} from "typeorm";

export class addPassword1657709099900 implements MigrationInterface {
    name = 'addPassword1657709099900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "password" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "password"`);
    }

}
