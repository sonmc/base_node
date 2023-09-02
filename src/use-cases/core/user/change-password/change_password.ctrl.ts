import * as Koa from "koa";
import ChangePasswordFlow from "./change_password.flow";
import { getRepository } from "typeorm";
import { UserSchema } from "../../../../services/schemas/core/user.schema"; 
import { UserService } from "../../../../services/core/user.service";
import { ACCESS_TOKEN, INVALID_TOKEN } from "utils/core/const.variable";

class ChangePasswordCtrl {
  async changePassword(ctx: Koa.Context, _next: Koa.Next) {
    const access_token = ctx.cookies.get(ACCESS_TOKEN) || "";
    const pwd = ctx.request.body;
    const flow = new ChangePasswordFlow(
      new UserService(getRepository(UserSchema))
    );
    const user = await flow.changePassword(pwd, access_token);
    if (user) {
      ctx.body = user;
    } else {
      ctx.status = 400;
      ctx.body = INVALID_TOKEN;
    }
  }
}

export default new ChangePasswordCtrl();
