import * as Koa from 'koa';
import { UserService } from 'services/user/user.service';
import UserFlow from './user.flow';
import { order, paginated } from 'utils/ctrl.util';
import { PaginationPresenter } from './presenter/pagination.presenter';

export async function getAll(ctx: Koa.Context, _next: Koa.Next) {
    const flow = new UserFlow(new UserService());
    const { status, result } = await flow.getAllUser();
    const { limit, page } = ctx.request.body as PaginationPresenter;
    const ordered = order(result, 'name', 'asc');
    const response = paginated(limit, page, ordered);
    if (status === 'success') {
        ctx.body = response;
    } else {
        ctx.status = 400;
        ctx.body = 'Invalid status';
    }
}

export default { getAll };
