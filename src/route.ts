import * as Koa from 'koa';
import loginCtrl from 'use-case/auth/login/login.ctrl';
import roleCtrl from 'use-case/role/role.ctrl';
import { getAll } from 'use-case/user/user.ctrl';
import 'reflect-metadata';

type RouteItem = { path: string; ctrl: (ctx: Koa.Context, next: Koa.Next) => any };
const routes: RouteItem[] = [
    { path: '/', ctrl: getAll },
    { path: '/auth/login', ctrl: loginCtrl },
    { path: '/roles', ctrl: roleCtrl },
];
export default routes;
