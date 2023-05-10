import Koa from 'koa';
import Router from '@koa/router';
import { get_routes, post_routes, delete_routes } from 'route';
import { createConnection } from 'typeorm';
import dataSourceOptions from 'infrastructure/framework/typeorm.config';
import bodyParser from 'koa-bodyparser';
require('dotenv').config();

const app = new Koa();
createConnection(dataSourceOptions)
    .then(async () => {
        const router = new Router({
            prefix: '/api',
        });
        app.use(bodyParser());
        app.use(router.routes()).use(router.allowedMethods());

        get_routes.map(({ path: path, ctrl: ctrl }) => router.get(path, ctrl));
        post_routes.map(({ path: path, ctrl: ctrl }) => router.post(path, ctrl));
        delete_routes.map(({ path: path, ctrl: ctrl }) => router.delete(path, ctrl));

        app.listen(3000, () => {
            console.log('Server started on port 3000');
        });
    })
    .catch((error: any) => console.log('TypeORM connection error:', error));
