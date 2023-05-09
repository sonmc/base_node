import Koa from 'koa';
import Router from '@koa/router';
import routes from 'route';
import { createConnection } from 'typeorm';
import dataSourceOptions from 'infrastructure/framework/typeorm.config';

const app = new Koa();
createConnection(dataSourceOptions)
    .then(async () => {
        const router = new Router({
            prefix: '/api',
        });

        app.use(router.routes()).use(router.allowedMethods());
        routes.map(({ path: path, ctrl: ctrl }) => router.get(path, ctrl));
        app.listen(3000, () => {
            console.log('Server started on port 3000');
        });
    })
    .catch((error: any) => console.log('TypeORM connection error:', error));
