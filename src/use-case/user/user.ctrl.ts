import * as Koa from 'koa';

export function getAll(ctx: Koa.Context, _next: Koa.Next) {
    ctx.body = 'Hello world';
}

export default { getAll };
