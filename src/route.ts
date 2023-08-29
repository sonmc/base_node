import * as Koa from "koa";

import { PROFILE_TYPE } from "./utils/const.variable";
import authCtrl from "./use-cases/core/auth/auth.ctrl";
import get_currentCtrl from "./use-cases/core/user/get-current/get_current.ctrl";
import roleCtrl from "./use-cases/core/role/role.ctrl";
import crud_userCtrl from "./use-cases/core/user/crud/crud_user.ctrl";
import change_passwordCtrl from "./use-cases/core/user/change-password/change_password.ctrl";

type RouteItem = {
  path: string;
  name: string;
  ctrl: (ctx: Koa.Context, next: Koa.Next) => any;
};

const get_routes: RouteItem[] = [
  {
    name: "[]",
    path: "/users/get-current-user",
    ctrl: get_currentCtrl.get,
  },
  { name: "[]", path: "/auth/refresh-token", ctrl: authCtrl.refreshToken },
  { name: "[]", path: "/auth/logout", ctrl: authCtrl.logout },
  {
    name: JSON.stringify([PROFILE_TYPE.ADMIN]),
    path: "/roles",
    ctrl: roleCtrl.list,
  },

  {
    name: JSON.stringify([PROFILE_TYPE.ADMIN]),
    path: "/users",
    ctrl: crud_userCtrl.list,
  },
];

const post_routes: RouteItem[] = [
  { name: "[]", path: "/auth/login", ctrl: authCtrl.login },
  {
    name: JSON.stringify([PROFILE_TYPE.SUPPER_ADMIN, PROFILE_TYPE.ADMIN]),
    path: "/users",
    ctrl: crud_userCtrl.create,
  },
  {
    name: JSON.stringify([]),
    path: "/users/change-password",
    ctrl: change_passwordCtrl.changePassword,
  },
];
const delete_routes: RouteItem[] = [
  {
    name: JSON.stringify([PROFILE_TYPE.ADMIN]),
    path: "/users",
    ctrl: crud_userCtrl.delete,
  },
];

export { get_routes, post_routes, delete_routes };
