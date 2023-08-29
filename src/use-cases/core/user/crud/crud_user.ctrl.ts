import * as Koa from "koa";
import UserFlow from "./crud_user.flow";
import { CrudUserPresenter } from "./crud_user.presenter";
import { userValidate } from "./crud_user.validator";
import { applyPagination, applySort } from "../../../../utils/ctrl.util";
import { UserService } from "../../../../services/core/user.service";
import { getRepository } from "typeorm";
import { UserSchema } from "../../../../services/schemas/core/user.schema";
import { STATUS_400 } from "../../../../utils/const.variable";

class CrudUserCtrl {
  flow: any;
  constructor() {
    this.flow = new UserFlow(new UserService(getRepository(UserSchema)));
  }
  async list(ctx: Koa.Context, _next: Koa.Next) {
    const { limit, page } = ctx.request.body as CrudUserPresenter;
    let { status, result } = await this.flow.list();
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
    const { status, result } = await this.flow.create(user);
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
    const [status, result] = await this.flow.delete(ids);
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
