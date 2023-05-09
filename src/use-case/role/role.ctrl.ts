import * as Koa from 'koa';
import GetAllFlow from './get-all.flow';
import { RoleService } from 'services/role/role.service';

async function roleCtrl(ctx: Koa.Context, _next: Koa.Next) {
    const flow = new GetAllFlow(new RoleService());
    const result = await flow.getAll();
    ctx.body = result;
}
export default roleCtrl;
