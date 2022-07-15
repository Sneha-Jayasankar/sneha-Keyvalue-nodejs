import {MigrationInterface, QueryRunner} from "typeorm";

export class addRole1657716072245 implements MigrationInterface {
    name = 'addRole1657716072245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
    }

}
