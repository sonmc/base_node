import * as Koa from 'koa';
import roleCtrl from './use-case/role/role.ctrl';
import authCtrl from './use-case/auth/auth.ctrl';
import userCtrl from './use-case/user/crud/crud_user.ctrl';
import uploadCtrl from './use-case/file/upload-file/upload.ctrl';
import getCurrentCtrl from './use-case/user/get-current/get_current.ctrl';
import changePasswordCtrl from './use-case/user/change-password/change_password.ctrl';
import { PROFILE_TYPE } from './utils/const.variable';

type RouteItem = {
    path: string;
    name: string;
    ctrl: (ctx: Koa.Context, next: Koa.Next) => any;
};

const get_routes: RouteItem[] = [
    {
        name: '[]',
        path: '/users/get-current-user',
        ctrl: getCurrentCtrl.get,
    },
    { name: '[]', path: '/auth/refresh-token', ctrl: authCtrl.refreshToken },
    { name: '[]', path: '/auth/logout', ctrl: authCtrl.logout },
    {
        name: JSON.stringify([PROFILE_TYPE.ADMIN]),
        path: '/roles',
        ctrl: roleCtrl.list,
    },

    {
        name: JSON.stringify([PROFILE_TYPE.ADMIN]),
        path: '/users',
        ctrl: userCtrl.list,
    },
];

const post_routes: RouteItem[] = [
    { name: '[]', path: '/auth/login', ctrl: authCtrl.login },
    { name: '[]', path: '/upload', ctrl: uploadCtrl.upload },
    {
        name: JSON.stringify([PROFILE_TYPE.SUPPER_ADMIN, PROFILE_TYPE.ADMIN]),
        path: '/users',
        ctrl: userCtrl.create,
    },
    {
        name: JSON.stringify([]),
        path: '/users/change-password',
        ctrl: changePasswordCtrl.changePassword,
    },
];
const delete_routes: RouteItem[] = [
    {
        name: JSON.stringify([PROFILE_TYPE.ADMIN]),
        path: '/users',
        ctrl: userCtrl.delete,
    },
];

export { get_routes, post_routes, delete_routes };
