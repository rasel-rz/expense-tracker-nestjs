import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig1736098126299 implements MigrationInterface {
    name = 'Mig1736098126299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "person" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "info" character varying NOT NULL, "avatar" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" uuid, CONSTRAINT "UQ_27c811883af9f3fefe79892f02b" UNIQUE ("name"), CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5fdaf670315c4b7e70cce85daa" ON "person" ("id") `);
        await queryRunner.query(`CREATE TABLE "entry" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_a58c675c4c129a8e0f63d3676d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a58c675c4c129a8e0f63d3676d" ON "entry" ("id") `);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "info" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" uuid, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9c4e4a89e3674fc9f382d733f0" ON "category" ("id") `);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cace4a159ff9f2512dd4237376" ON "user" ("id") `);
        await queryRunner.query(`CREATE TABLE "entry_categories" ("entryId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_0bf03bdedc12d6316d277c9381f" PRIMARY KEY ("entryId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7553731f79656a14c8bfa1d283" ON "entry_categories" ("entryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_77dc62ae55526b3eb94cee312e" ON "entry_categories" ("categoryId") `);
        await queryRunner.query(`CREATE TABLE "entry_persons" ("entryId" uuid NOT NULL, "personId" uuid NOT NULL, CONSTRAINT "PK_df6354758d43ebbbc8afaff7c12" PRIMARY KEY ("entryId", "personId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f79e346dec1d73c6148c6cfbbc" ON "entry_persons" ("entryId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b7645f364cb352266a4752c044" ON "entry_persons" ("personId") `);
        await queryRunner.query(`ALTER TABLE "person" ADD CONSTRAINT "FK_83b775da14886d352de2a4cac01" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entry" ADD CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_32b856438dffdc269fa84434d9f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "entry_categories" ADD CONSTRAINT "FK_7553731f79656a14c8bfa1d2831" FOREIGN KEY ("entryId") REFERENCES "entry"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "entry_categories" ADD CONSTRAINT "FK_77dc62ae55526b3eb94cee312e2" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "entry_persons" ADD CONSTRAINT "FK_f79e346dec1d73c6148c6cfbbce" FOREIGN KEY ("entryId") REFERENCES "entry"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "entry_persons" ADD CONSTRAINT "FK_b7645f364cb352266a4752c0441" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "entry_persons" DROP CONSTRAINT "FK_b7645f364cb352266a4752c0441"`);
        await queryRunner.query(`ALTER TABLE "entry_persons" DROP CONSTRAINT "FK_f79e346dec1d73c6148c6cfbbce"`);
        await queryRunner.query(`ALTER TABLE "entry_categories" DROP CONSTRAINT "FK_77dc62ae55526b3eb94cee312e2"`);
        await queryRunner.query(`ALTER TABLE "entry_categories" DROP CONSTRAINT "FK_7553731f79656a14c8bfa1d2831"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_32b856438dffdc269fa84434d9f"`);
        await queryRunner.query(`ALTER TABLE "entry" DROP CONSTRAINT "FK_a43c2ecae5cadbff32cc3c4e665"`);
        await queryRunner.query(`ALTER TABLE "person" DROP CONSTRAINT "FK_83b775da14886d352de2a4cac01"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b7645f364cb352266a4752c044"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f79e346dec1d73c6148c6cfbbc"`);
        await queryRunner.query(`DROP TABLE "entry_persons"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_77dc62ae55526b3eb94cee312e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7553731f79656a14c8bfa1d283"`);
        await queryRunner.query(`DROP TABLE "entry_categories"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cace4a159ff9f2512dd4237376"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9c4e4a89e3674fc9f382d733f0"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a58c675c4c129a8e0f63d3676d"`);
        await queryRunner.query(`DROP TABLE "entry"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5fdaf670315c4b7e70cce85daa"`);
        await queryRunner.query(`DROP TABLE "person"`);
    }

}
