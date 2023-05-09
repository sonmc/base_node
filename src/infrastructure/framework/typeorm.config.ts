import { ConnectionOptions } from 'typeorm';

const dataSourceOptions: ConnectionOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '0', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: ['src/infrastructure/schemas/*.ts'],
    migrations: ['src/infrastructure/migrations/*.ts'],
};

export default dataSourceOptions;
