import Koa from 'koa';
import Router from '@koa/router';
import { get_routes, post_routes, delete_routes } from './route';
import { createConnection } from 'typeorm';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import koaBody from 'koa-body';
import AWS from 'aws-sdk';
import { UserSchema } from './service/schemas/user.schema';
import { PermSchema } from './service/schemas/perm.schema';
import { GroupSchema } from './service/schemas/group.schema';
import 'reflect-metadata';

const app = new Koa();
const router = new Router({
    prefix: '/api',
});

AWS.config.update({
    accessKeyId: 'AKIAV4VZDG5MDKDDLFVM',
    secretAccessKey: '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',
});

createConnection({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'Z8l_internal',
    logging: false,
    entities: [UserSchema, PermSchema, GroupSchema],
    migrations: ['src/database/migration/**/*.ts'],
})
    .then(async () => {
        app.use(
            cors({
                allowHeaders: ['Content-Type'],
                credentials: true,
                origin: '*',
            })
        );
        app.use(
            koaBody({
                multipart: true,
                formidable: {
                    uploadDir: './uploads',
                    keepExtensions: true,
                },
            })
        );
        app.use(bodyParser());
        app.use(router.routes()).use(router.allowedMethods());
        get_routes.map(({ name: name, path: path, ctrl: ctrl }) => router.get(name, path, ctrl));
        post_routes.map(({ name: name, path: path, ctrl: ctrl }) => router.post(name, path, ctrl));
        delete_routes.map(({ name: name, path: path, ctrl: ctrl }) => router.delete(name, path, ctrl));

        app.listen(5000, () => {
            console.log('Server started on port ' + 5000);
        });
    })
    .catch((error: any) => console.log('TypeORM connection error:', error));
