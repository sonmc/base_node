import Koa from 'koa';
import Router from '@koa/router';
import { get_routes, post_routes, delete_routes } from 'route';
import { createConnection } from 'typeorm';
import dataSource from 'database/config/data-source';
import bodyParser from 'koa-bodyparser';

const app = new Koa();
const router = new Router({
    prefix: '/api',
});
createConnection(dataSource)
    .then(async () => {
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

function captureRouters() {
    const routers: any[] = [];
    router.stack.forEach((middleware: any) => {
        if (middleware) {
            if (middleware.methods && middleware.methods.length > 0) {
                const routeHandler = middleware.stack[0];
                routers.push({
                    endpoint: middleware.path,
                    funtion_name: routeHandler.name,
                });
            }
        }
    });

    routers.forEach((path) => {
        console.log(path);
    });
}
