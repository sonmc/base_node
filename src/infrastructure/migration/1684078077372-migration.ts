import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1684078077372 implements MigrationInterface {
    name = 'migration1684078077372'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "FK_e4435209df12bc1f001e5360174"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_e4435209df12bc1f001e536017"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_1cf664021f00b9cc1ff95e17de"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "PK_c525e9373d63035b9919e578a9c"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "PK_e4435209df12bc1f001e5360174" PRIMARY KEY ("user_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP COLUMN "role_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD "role_id" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "PK_e4435209df12bc1f001e5360174"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "PK_c525e9373d63035b9919e578a9c" PRIMARY KEY ("user_id", "role_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "PK_c525e9373d63035b9919e578a9c"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "PK_1cf664021f00b9cc1ff95e17de4" PRIMARY KEY ("role_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP COLUMN "user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD "user_id" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "PK_1cf664021f00b9cc1ff95e17de4"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "PK_c525e9373d63035b9919e578a9c" PRIMARY KEY ("role_id", "user_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "PK_c525e9373d63035b9919e578a9c"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "PK_1cf664021f00b9cc1ff95e17de4" PRIMARY KEY ("role_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP COLUMN "user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD "user_id" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "PK_1cf664021f00b9cc1ff95e17de4"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "PK_c525e9373d63035b9919e578a9c" PRIMARY KEY ("role_id", "user_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "PK_c525e9373d63035b9919e578a9c"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "PK_e4435209df12bc1f001e5360174" PRIMARY KEY ("user_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP COLUMN "role_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD "role_id" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "PK_e4435209df12bc1f001e5360174"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "PK_c525e9373d63035b9919e578a9c" PRIMARY KEY ("user_id", "role_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e4435209df12bc1f001e536017" ON "users_roles" ("user_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_1cf664021f00b9cc1ff95e17de" ON "users_roles" ("role_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "FK_e4435209df12bc1f001e5360174" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "FK_e4435209df12bc1f001e5360174"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_1cf664021f00b9cc1ff95e17de"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_e4435209df12bc1f001e536017"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "PK_c525e9373d63035b9919e578a9c"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "PK_e4435209df12bc1f001e5360174" PRIMARY KEY ("user_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP COLUMN "role_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD "role_id" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "PK_e4435209df12bc1f001e5360174"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "PK_c525e9373d63035b9919e578a9c" PRIMARY KEY ("role_id", "user_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "PK_c525e9373d63035b9919e578a9c"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "PK_1cf664021f00b9cc1ff95e17de4" PRIMARY KEY ("role_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP COLUMN "user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD "user_id" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "PK_1cf664021f00b9cc1ff95e17de4"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "PK_c525e9373d63035b9919e578a9c" PRIMARY KEY ("role_id", "user_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "PK_c525e9373d63035b9919e578a9c"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "PK_1cf664021f00b9cc1ff95e17de4" PRIMARY KEY ("role_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP COLUMN "user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD "user_id" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "PK_1cf664021f00b9cc1ff95e17de4"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "PK_c525e9373d63035b9919e578a9c" PRIMARY KEY ("user_id", "role_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "PK_c525e9373d63035b9919e578a9c"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "PK_e4435209df12bc1f001e5360174" PRIMARY KEY ("user_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP COLUMN "role_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD "role_id" uuid NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles" DROP CONSTRAINT "PK_e4435209df12bc1f001e5360174"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "PK_c525e9373d63035b9919e578a9c" PRIMARY KEY ("user_id", "role_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_1cf664021f00b9cc1ff95e17de" ON "users_roles" ("role_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_e4435209df12bc1f001e536017" ON "users_roles" ("user_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "FK_1cf664021f00b9cc1ff95e17de4" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "users_roles"
            ADD CONSTRAINT "FK_e4435209df12bc1f001e5360174" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

}
