import * as Koa from "koa";
import GetAllFlow from "./crud_group.flow"; 
import { getRepository } from "typeorm";
import { GroupSchema } from "../../../../services/schemas/core/group.schema";
import { GroupService } from '../../../../services/core/group.service';

class CrudGroupCtrl {
  async list(ctx: Koa.Context, _next: Koa.Next) {
    const flow = new GetAllFlow(new GroupService(getRepository(GroupSchema)));
    const result = await flow.getAll();
    ctx.body = result;
  }
}

export default new CrudGroupCtrl();
