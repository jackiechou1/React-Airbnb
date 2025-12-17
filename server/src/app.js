const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("koa2-cors");
const authRoutes = require("./routes/auth");

function createApp() {
  const app = new Koa();

  app.use(
    cors({
      origin: (ctx) => ctx.get("origin") || "http://localhost:3000",
      credentials: true,
    })
  );
  app.use(bodyParser());

  app.use(authRoutes.routes());
  app.use(authRoutes.allowedMethods());

  app.use(async (ctx) => {
    if (ctx.path === "/api/health") {
      ctx.body = { ok: true };
      return;
    }
    ctx.status = 404;
    ctx.body = { code: "NOT_FOUND", message: "接口不存在", data: null };
  });

  return app;
}

module.exports = { createApp };
