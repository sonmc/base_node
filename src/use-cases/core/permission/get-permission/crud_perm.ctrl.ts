import * as Koa from 'koa';
import { CrudPermFlow } from './crud_perm.flow'; 
import { getRepository } from 'typeorm';
import { PermService } from '../../../../services/core/perm.service';
import { PermSchema } from '../../../../services/schemas/core/perm.schema'; 
import { applySort } from '../../../../utils/core/ctrl.util';
import { STATUS_400 } from '../../../../utils/core/const.variable';

class CrudPermCtrl {
  async list(ctx: Koa.Context, _next: Koa.Next) {
    const flow = new CrudPermFlow(new PermService(getRepository(PermSchema)));
    let { status, result } = await flow.list();
    let query = applySort('id', 'desc', result); 
    result = await query.getMany();

    if (status === 'success') {
      ctx.body = result;
      return;
    } else {
      ctx.status = 400;
      ctx.body = STATUS_400;
      return;
    }
  }
}

export default new CrudPermCtrl();
