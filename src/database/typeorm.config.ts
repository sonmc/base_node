import { GroupSchema } from "../service/schemas/group.schema";
import { PermSchema } from "../service/schemas/perm.schema";
import { UserSchema } from "../service/schemas/user.schema";
import { ConnectionOptions } from "typeorm";

const typeOrmConfig: ConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'base_core',
    logging: false,
    entities: [UserSchema, PermSchema, GroupSchema],
    migrations: ['src/database/migration/**/*.ts'],
}

export default typeOrmConfig;