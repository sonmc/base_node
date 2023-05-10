import * as Koa from 'koa';
import { AuthService } from 'services/auth/auth.service';
import LoginFlow from './login/login.flow';
import { AuthPresenter } from './login/presenter/auth.presenter';
import RefreshTokenFlow from './refresh-token/refresh-token.flow';
import { UserService } from 'services/user/user.service';

export async function login(ctx: Koa.Context, _next: Koa.Next) {
    const { username, password } = ctx.request.body as AuthPresenter;
    const flow = new LoginFlow(new AuthService());
    const { accessToken, refreshToken } = await flow.login(username, password);
    ctx.cookies.set('access-token', accessToken, {
        httpOnly: true,
    });

    ctx.cookies.set('refresh-token', refreshToken, {
        httpOnly: true,
    });
    ctx.body = 'successfully!';
}

export async function refreshToken(ctx: Koa.Context, _next: Koa.Next) {
    const refresh_token = ctx.cookies.get('refresh-token') || '';
    const flow = new RefreshTokenFlow(new UserService());
    const accessToken = await flow.refreshToken(refresh_token);
    ctx.cookies.set('access-token', accessToken, {
        httpOnly: true,
    });
    ctx.body = 'successfully!';
}

export async function logout(ctx: Koa.Context, _next: Koa.Next) {
    ctx.cookies.set('access-token', null, {
        httpOnly: true,
    });
}

export default { login, refreshToken, logout };
