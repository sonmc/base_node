import { ConnectionOptions } from 'typeorm';

export const dataSourceOptions: ConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'z8l_tool',
    synchronize: false,
    logging: true,
    entities: ['src/infrastructure/schemas/*.schema.ts'],
    migrations: ['src/infrastructure/migrations/*.ts'],
};

export default dataSourceOptions;
