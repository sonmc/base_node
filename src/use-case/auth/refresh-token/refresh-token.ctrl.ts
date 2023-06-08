import * as Koa from 'koa';
import { UserService } from 'service/user.service';
import RefreshTokenFlow from './refresh-token.flow';

export async function refreshToken(ctx: Koa.Context, _next: Koa.Next) {
    const refresh_token = ctx.cookies.get('refresh-token') || '';
    const flow = new RefreshTokenFlow(new UserService());
    if (!refresh_token) {
        ctx.status = 401;
        ctx.body = 'authorization!';
    }
    const { status, result } = await flow.refreshToken(refresh_token);
    if (status === 'error') {
        ctx.status = 401;
        ctx.body = 'authorization!';
    }
    ctx.cookies.set('access-token', result, {
        httpOnly: true,
    });
    ctx.body = 'successfully!';
}
export default { refreshToken };
