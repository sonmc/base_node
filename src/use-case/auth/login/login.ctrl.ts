import * as Koa from 'koa';
import { AuthService } from 'service/auth.service';

import { UserService } from 'service/user.service';
import { AuthPresenter } from './login.presenter';
import LoginFlow from './login.flow';

export async function login(ctx: Koa.Context, _next: Koa.Next) {
    const { username, password } = ctx.request.body as AuthPresenter;
    const flow = new LoginFlow(new AuthService(), new UserService());
    const { status, result } = await flow.login(username, password);
    if (status == 'error') {
        ctx.status = 401;
        ctx.body = 'authorization!';
    } else {
        const { accessToken, refreshToken } = result;
        ctx.cookies.set('access-token', accessToken, { httpOnly: true });
        ctx.cookies.set('refresh-token', refreshToken, { httpOnly: true });
        ctx.body = 'successfully!';
    }
}

export async function logout(ctx: Koa.Context, _next: Koa.Next) {
    ctx.cookies.set('access-token', null, {
        httpOnly: true,
    });
}

export default { login, logout };
