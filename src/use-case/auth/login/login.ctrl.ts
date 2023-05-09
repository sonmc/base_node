import * as Koa from 'koa';
import { LoginFlow } from './login.flow';
import { AuthService } from 'services/auth/auth.service';

async function loginCtrl(ctx: Koa.Context, _next: Koa.Next) {
    const flow = new LoginFlow(new AuthService());
    const result = await flow.login();
    ctx.body = result;
}
export default loginCtrl;
