import * as Koa from "koa";
import { CrudPermFlow } from "./crud_perm.flow";
import { permValidate } from "./crud_user.validator"; 
import { getRepository } from "typeorm"; 
import { PermService } from "services/core/perm.service";
import { PermSchema } from "services/schemas/core/perm.schema";
import { CrudPermPresenter } from "./crud_perm.presenter";
import { applySort } from "utils/core/ctrl.util";
import { STATUS_400 } from "utils/core/const.variable";

class CrudPermCtrl {
  async list(ctx: Koa.Context, _next: Koa.Next) {
    const flow = new CrudPermFlow(new PermService(getRepository(PermSchema)));
    let { status, result } = await flow.list();
    let query = applySort("id", "desc", result);
    // query = applySearch('id', 'desc', query);
    // query = applyFilter('id', 'desc', query);
    result = await query.getMany();

    if (status === "success") {
      ctx.body = result;
      return;
    } else {
      ctx.status = 400;
      ctx.body = STATUS_400;
      return;
    }
  }

  async create(ctx: Koa.Context, _next: Koa.Next) {
    const perm = ctx.request.body as CrudPermPresenter;
    const validation = await permValidate(perm);
    if (validation.status == "error") {
      ctx.status = 400;
      ctx.body = STATUS_400;
      return;
    }
    const flow = new CrudPermFlow(new PermService(getRepository(PermSchema)));
    const { status, result } = await flow.create(perm);
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
    const flow = new CrudPermFlow(new PermService(getRepository(PermSchema)));
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

export default new CrudPermCtrl();
