import Koa from "koa";

import { verify } from "utils/bcrypt.util";
import { getPublicApi } from "utils/ctrl.util";

export class AuthMiddleware {
  public static async checkAuth(
    ctx: Koa.DefaultContext,
    next: Function
  ): Promise<void> {
    try {
      console.log(ctx.originalUrl);
      const url = ctx.originalUrl.replace("/api/", "");
      const publicApis = getPublicApi();
      if (!publicApis.includes(url)) {
        let token: string = ctx.cookies.get("access_token");
        if (!token) {
          const { authorization } = ctx.headers;
          if (!authorization) {
            ctx.status = 401;
            ctx.body = "authorization";
            return;
          }
          token = authorization.split(" ")[1];
        }
        const payload = verify(token);
        if (payload) {
          ctx.state.jwt = payload;
          await next();
        } else {
          ctx.status = 404;
          ctx.body = "User does not exist.";
        }
      }
      await next();
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
    roles: string[],
    ctx: Koa.DefaultContext,
    next: Function
  ): Promise<void> {
    if (ctx.state.jwt && roles.some((role) => ctx.state.jwt.role === role))
      await next();
    else {
      ctx.status = 403;
      ctx.body = `You need ${
        roles.length <= 1
          ? roles[0]
          : roles.slice(0, -1).join(", ") + " or " + roles.slice(-1)
      } rights to access this resource.`;
    }
  }
}
