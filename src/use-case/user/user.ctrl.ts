import * as Koa from 'koa';
import { UserService } from 'services/user/user.service';
import UserFlow from './user.flow';

export async function getAll(ctx: Koa.Context, _next: Koa.Next) {
    const flow = new UserFlow(new UserService());
    const { status, result } = await flow.getAllUser();
    if (status === 'success') {
        ctx.body = result;
    } else {
        ctx.status = 400;
        ctx.body = 'Invalid status';
    }
}

export default { getAll };
