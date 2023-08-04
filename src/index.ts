import Koa from 'koa';
import Router from '@koa/router';
import { get_routes, post_routes, delete_routes } from './route';
import { createConnection } from 'typeorm';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import koaBody from 'koa-body';
import AWS from 'aws-sdk'; 
import { koaSwagger } from 'koa2-swagger-ui';
import koaSend from 'koa-send';
import typeOrmConfig from "./database/typeorm.config"
import 'reflect-metadata';

const app = new Koa();
const router = new Router({
    prefix: '/api',
});

AWS.config.update({
    accessKeyId: 'AKIAV4VZDG5MDKDDLFVM',
    secretAccessKey: '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',
});

createConnection(typeOrmConfig)
    .then(async () => {

        app.use(koaSwagger({
            swaggerOptions: {
              url: '/swagger.json', // example path to json
            },
          }));
          
          app.use(async (ctx, next) => {
            if (ctx.path === '/swagger.json') {
              await koaSend(ctx, ctx.path);
            } else {
              await next();
            }
          });

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
