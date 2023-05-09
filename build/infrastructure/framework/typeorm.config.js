"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("infrastructure/schemas/user.schema");
const dataSource = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'test_db',
    entities: [user_schema_1.User],
    synchronize: false,
};
exports.default = dataSource;
