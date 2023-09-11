import Koa from "koa";

import { verify } from "../utils/core/bcrypt.util";
import { getPublicApi } from "../utils/core/ctrl.util";
import { getRepository } from "typeorm";
import { UserSchema } from "../services/schemas/core/user.schema";
import { UserService } from "../services/core/user.service";
import { PermService } from "../services/core/perm.service";
import { PermSchema } from "../services/schemas/core/perm.schema";
import CheckPermissionFlow from "./core/permission/check-permission/check_permission.flow";


export class AuthMiddleware {
  public static async checkAuth(
    ctx: Koa.DefaultContext,
    next: Function
  ): Promise<void> {
    try {
      const url = ctx.originalUrl.replace("/api/", "");
      const publicApis = getPublicApi();
      if (!publicApis.includes(url)) {
        let token: string = ctx.cookies.get("access_token");
        if (!token) {
          const { authorization } = ctx.headers;
          if (!authorization) {
            ctx.status = 401;
            ctx.body = "authorization"; 
          }
          token = authorization.split(" ")[1];
        }
        const payload = await verify(token);
        if (payload) {
          ctx.state.jwt = payload;
          const isAccess = await AuthMiddleware.checkPerm(
            {
              user_id: payload.id,
              action: url,
            }
          );
          if(isAccess){
            await next();
          }
        } else {
          ctx.status = 404;
          ctx.body = "User does not exist.";
        }
      } else {
        await next();
      }
    } catch (e: any) {
      if (e.name === "TokenExpiredError") {
        ctx.status = 401;
        ctx.body = `Authorization token has expired on ${new Date(
          e.expiredAt
        )}.`;
      } else {
        ctx.status = 500;
        ctx.body = e;
      }
    }
  }

  public static async checkPerm(
    payload: any
  ): Promise<boolean> {
    const flow = new CheckPermissionFlow(
      new UserService(getRepository(UserSchema)),
      new PermService(getRepository(PermSchema))
    );
    const isHasPerm = await flow.verifyPermission(payload.id, payload.action);
    return isHasPerm.status == "success";
  }
}
