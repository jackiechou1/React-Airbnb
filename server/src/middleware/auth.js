const { verifyAccessToken } = require("../auth/tokens");

function getBearerToken(ctx) {
  const header = ctx.get("authorization") || "";
  const m = header.match(/^Bearer\s+(.+)$/i);
  return m ? m[1] : null;
}

async function requireAuth(ctx, next) {
  const token = getBearerToken(ctx);
  if (!token) {
    ctx.status = 401;
    ctx.body = { code: "UNAUTHORIZED", message: "missing token" };
    return;
  }

  try {
    ctx.state.auth = verifyAccessToken(token);
  } catch (_) {
    ctx.status = 401;
    ctx.body = { code: "UNAUTHORIZED", message: "invalid token" };
    return;
  }

  await next();
}

module.exports = { requireAuth };

