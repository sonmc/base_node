import * as Koa from "koa";
 
import authCtrl from "./use-cases/core/auth/auth.ctrl";
import getCurrentCtrl from "./use-cases/core/user/get-current/get_current.ctrl"; 
import crudUserCtrl from "./use-cases/core/user/crud/crud_user.ctrl";
import changePasswordCtrl from "./use-cases/core/user/change-password/change_password.ctrl";
 
import { PROFILE_TYPE } from "utils/core/const.variable";
import crudGroupCtrl from "use-cases/core/group/crud/crud_group.ctrl";


type RouteItem = {
  path: string;
  name: string;
  ctrl: (ctx: Koa.Context, next: Koa.Next) => any;
};

const get_routes: RouteItem[] = [
  {
    name: "[]",
    path: "/users/get-current-user",
    ctrl: getCurrentCtrl.get,
  },
  { name: "[]", path: "/auth/refresh-token", ctrl: authCtrl.refreshToken },
  { name: "[]", path: "/auth/logout", ctrl: authCtrl.logout },
  {
    name: JSON.stringify([PROFILE_TYPE.ADMIN]),
    path: "/roles",
    ctrl: crudGroupCtrl.list,
  },

  {
    name: JSON.stringify([PROFILE_TYPE.ADMIN]),
    path: "/users",
    ctrl: crudUserCtrl.list,
  },
];

const post_routes: RouteItem[] = [
  { name: "[]", path: "/auth/login", ctrl: authCtrl.login },
  {
    name: JSON.stringify([PROFILE_TYPE.SUPPER_ADMIN, PROFILE_TYPE.ADMIN]),
    path: "/users",
    ctrl: crudUserCtrl.create,
  },
  {
    name: JSON.stringify([]),
    path: "/users/change-password",
    ctrl: changePasswordCtrl.changePassword,
  },
];
const delete_routes: RouteItem[] = [
  {
    name: JSON.stringify([PROFILE_TYPE.ADMIN]),
    path: "/users",
    ctrl: crudUserCtrl.delete,
  },
];

export { get_routes, post_routes, delete_routes };
