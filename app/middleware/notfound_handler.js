module.exports = () => {
  return async function notFoundHandler(ctx, next) {
    await next();
    if (ctx.status === 404 && !ctx.body) {
      if (ctx.acceptJSON) {
        ctx.body = { error: 'Not Found' };
      } else {
        ctx.body = '<h1 style="line-height: 100vh; text-align: center; color: #aaa;">Page Not Found</h1>';
      }
    }
  };
};
