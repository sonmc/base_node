import { ConnectionOptions } from 'typeorm';

const dataSourceOptions: ConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'test_db',
    synchronize: false,
    logging: true,
    entities: ['src/infrastructure/schemas/*.ts'],
    migrations: ['src/infrastructure/migrations/*.ts'],
};

export default dataSourceOptions;
