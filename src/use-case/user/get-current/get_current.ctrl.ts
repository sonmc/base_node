import * as Koa from 'koa';
import { UserService } from '../../../service/user.service';
import { ACCESS_TOKEN, INVALID_TOKEN } from '../../../util/const.variable';
import GetCurrentUserFlow from './get-current.flow';
import { GetCurrentUserPresenter } from './get-current.presenter';

class GetCurrentUserCtrl {
    async get(ctx: Koa.Context, _next: Koa.Next) {
        const flow = new GetCurrentUserFlow(new UserService());
        const access_token = ctx.cookies.get(ACCESS_TOKEN) || '';
        const { status, result } = await flow.getCurrentUser(access_token);
        if (status == 'error') {
            ctx.status = 400;
            ctx.body = INVALID_TOKEN;
        }
        const user = result;
        const response = GetCurrentUserPresenter.presentItem(user);
        if (user) {
            ctx.body = response;
        } else {
            ctx.status = 400;
            ctx.body = INVALID_TOKEN;
        }
    }
}

export default new GetCurrentUserCtrl();
