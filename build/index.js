"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const router_1 = __importDefault(require("@koa/router"));
const route_1 = __importDefault(require("route"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_schema_1 = require("infrastructure/schemas/user.schema");
const app = new koa_1.default();
(0, typeorm_1.createConnection)({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'test_db',
    entities: [user_schema_1.User],
    synchronize: false,
})
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    const router = new router_1.default({
        prefix: '/api',
    });
    app.use(router.routes()).use(router.allowedMethods());
    route_1.default.map(({ path: path, ctrl: ctrl }) => router.get(path, ctrl));
    app.listen(3000, () => {
        console.log('Server started on port 3000');
    });
}))
    .catch((error) => console.log('TypeORM connection error:', error));
