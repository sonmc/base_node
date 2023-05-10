import * as Koa from 'koa';
import { login, logout, refreshToken } from 'use-case/auth/auth.ctrl';
import { getAll as getRoles } from 'use-case/role/role.ctrl';
import { getAll as getUsers } from 'use-case/user/user.ctrl';
import 'reflect-metadata';

type RouteItem = { path: string; ctrl: (ctx: Koa.Context, next: Koa.Next) => any };

const get_routes: RouteItem[] = [
    { path: '/roles', ctrl: getRoles },
    { path: '/users', ctrl: getUsers },
    { path: '/auth/refresh-token', ctrl: refreshToken },
    { path: '/auth/logout', ctrl: logout },
];

const post_routes: RouteItem[] = [{ path: '/auth/login', ctrl: login }];

const delete_routes: RouteItem[] = [{ path: '/users', ctrl: login }];

export { get_routes, post_routes, delete_routes };
