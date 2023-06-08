import { ConnectionOptions } from 'typeorm';
import dotenv from "dotenv";
dotenv.config();

const dataSource: ConnectionOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "0", 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: ['src/database/schemas/*.ts'],
    migrations: ['src/database/migrations/*.ts'],
};

export default dataSource;
