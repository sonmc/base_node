import * as Koa from 'koa';
import { getAll as getRoles } from 'use-case/role/role.ctrl';
import { getAll as getUsers } from 'use-case/user/crud/user.ctrl';
import { refreshToken } from 'use-case/auth/refresh-token/refresh-token.ctrl';
import { login, logout } from 'use-case/auth/login/login.ctrl';
import 'reflect-metadata';

type RouteItem = {
    path: string;
    ctrl: (ctx: Koa.Context, next: Koa.Next) => any;
};

const get_routes: RouteItem[] = [
    { path: '/roles', ctrl: getRoles },
    { path: '/users', ctrl: getUsers },
    { path: '/auth/refresh-token', ctrl: refreshToken },
    { path: '/auth/logout', ctrl: logout },
];

const post_routes: RouteItem[] = [{ path: '/auth/login', ctrl: login }];
const delete_routes: RouteItem[] = [{ path: '/users', ctrl: login }];
export { get_routes, post_routes, delete_routes };
