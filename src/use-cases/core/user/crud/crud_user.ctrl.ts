import * as Koa from "koa";
import UserFlow from "./crud_user.flow";
import { CrudUserPresenter } from "./crud_user.presenter";
import { userValidate } from "./crud_user.validator"; 
import { UserService } from "../../../../services/core/user.service";
import { getRepository } from "typeorm";
import { UserSchema } from "../../../../services/schemas/core/user.schema"; 
import { applyPagination, applySort } from "utils/core/ctrl.util";
import { STATUS_400 } from "utils/core/const.variable";

class CrudUserCtrl {
  async list(ctx: Koa.Context, _next: Koa.Next) {
    const { limit, page } = ctx.request.body as CrudUserPresenter;
    const flow = new UserFlow(new UserService(getRepository(UserSchema)));
    let { status, result } = await flow.list();
    let query = applySort("id", "desc", result);
    // query = applySearch('id', 'desc', query);
    // query = applyFilter('id', 'desc', query);
    result = await query.getMany();
    result = applyPagination(limit, page, result);
    const response = CrudUserPresenter.presentList(result);
    if (status === "success") {
      ctx.body = response;
      return;
    } else {
      ctx.status = 400;
      ctx.body = STATUS_400;
      return;
    }
  }

  async create(ctx: Koa.Context, _next: Koa.Next) {
    const user = ctx.request.body as CrudUserPresenter;
    const validation = await userValidate(user);
    if (validation.status == "error") {
      ctx.status = 400;
      ctx.body = STATUS_400;
      return;
    }
    const flow = new UserFlow(new UserService(getRepository(UserSchema)));
    const { status, result } = await flow.create(user);
    if (status == "error") {
      ctx.status = 400;
      ctx.body = STATUS_400;
      return;
    }
    ctx.body = { status, result };
    return;
  }

  async delete(ctx: Koa.Context, _next: Koa.Next) {
    const ids = ctx.request.body as number[];
    const flow = new UserFlow(new UserService(getRepository(UserSchema)));
    const [status, result] = await flow.delete(ids);
    if (status == "error") {
      ctx.status = 400;
      ctx.body = STATUS_400;
      return;
    }
    ctx.status = 200;
    ctx.body = result;
    return;
  }
}

export default new CrudUserCtrl();
