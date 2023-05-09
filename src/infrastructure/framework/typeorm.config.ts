import { User } from 'infrastructure/schemas/user.schema';

const dataSource = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'test_db',
    entities: [User],
    synchronize: false,
};
export default dataSource;
