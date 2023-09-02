import { GroupSchema } from "../services/schemas/core/group.schema";
import { PermSchema } from "../services/schemas/core/perm.schema";
import { UserSchema } from "../services/schemas/core/user.schema";
import { UserGroupSchema } from "../services/schemas/core/users-groups.schema";
import { ConnectionOptions } from "typeorm";

const typeOrmConfig: ConnectionOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: false,
  entities: [UserSchema, PermSchema, GroupSchema, UserGroupSchema],
  migrations: ["src/database/migrations/**/*.ts"],
  cli: {
    migrationsDir: "src/database/migrations",
  },
};

export default typeOrmConfig;
