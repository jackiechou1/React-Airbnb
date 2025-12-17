const Router = require("@koa/router");
const { prisma } = require("../db");
const { config } = require("../config");
const { hashPassword, verifyPassword } = require("../auth/password");
const { sha256, signAccessToken, signRefreshToken, verifyRefreshToken } = require("../auth/tokens");
const { validateRegisterBody, normalizeLoginBody } = require("../auth/validators");
const { requireAuth } = require("../middleware/auth");
const { ok, fail } = require("../utils/response");
const { isBlocked, recordFailure, recordSuccess } = require("../middleware/rateLimit");

function setRefreshCookie(ctx, token) {
  ctx.cookies.set(config.cookieName, token, {
    httpOnly: true,
    secure: config.cookieSecure,
    sameSite: config.cookieSameSite,
    overwrite: true,
    maxAge: config.refreshTokenTtlDays * 24 * 60 * 60 * 1000,
  });
}

function clearRefreshCookie(ctx) {
  ctx.cookies.set(config.cookieName, "", {
    httpOnly: true,
    secure: config.cookieSecure,
    sameSite: config.cookieSameSite,
    overwrite: true,
    maxAge: 0,
  });
}

function safeUser(user) {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    createdAt: user.createdAt,
  };
}

const router = new Router({ prefix: "/api/auth" });

router.post("/register", async (ctx) => {
  const parsed = validateRegisterBody(ctx.request.body);
  if (!parsed.ok) {
    fail(ctx, 400, "BAD_REQUEST", parsed.message);
    return;
  }

  const passwordHash = await hashPassword(parsed.password);

  try {
    const user = await prisma.user.create({
      data: {
        email: parsed.email,
        username: parsed.username,
        passwordHash,
      },
    });
    ok(ctx, { user: safeUser(user) }, "注册成功");
  } catch (e) {
    if (String(e?.code) === "P2002") {
      fail(ctx, 409, "CONFLICT", "邮箱或用户名已存在");
      return;
    }
    fail(ctx, 500, "INTERNAL", "注册失败，请稍后重试");
  }
});

router.post("/login", async (ctx) => {
  if (isBlocked(ctx)) {
    fail(ctx, 429, "TOO_MANY_REQUESTS", "尝试次数过多，请稍后再试");
    return;
  }

  const parsed = normalizeLoginBody(ctx.request.body);
  if (!parsed.ok) {
    fail(ctx, 400, "BAD_REQUEST", parsed.message);
    return;
  }

  const account = parsed.account;
  const isEmail = account.includes("@");
  const user = await prisma.user.findFirst({
    where: isEmail ? { email: account.toLowerCase() } : { username: account },
  });

  if (!user) {
    recordFailure(ctx);
    fail(ctx, 401, "UNAUTHORIZED", "账号或密码错误");
    return;
  }

  const okPwd = await verifyPassword(parsed.password, user.passwordHash);
  if (!okPwd) {
    recordFailure(ctx);
    fail(ctx, 401, "UNAUTHORIZED", "账号或密码错误");
    return;
  }

  recordSuccess(ctx);
  const accessToken = signAccessToken({ sub: user.id, email: user.email, username: user.username });
  const refreshToken = signRefreshToken({ sub: user.id });

  const expiresAt = new Date(Date.now() + config.refreshTokenTtlDays * 24 * 60 * 60 * 1000);
  await prisma.refreshToken.create({
    data: {
      userId: user.id,
      tokenHash: sha256(refreshToken),
      expiresAt,
    },
  });

  setRefreshCookie(ctx, refreshToken);
  ok(ctx, { accessToken, user: safeUser(user) }, "登录成功");
});

router.get("/me", requireAuth, async (ctx) => {
  const userId = ctx.state.auth?.sub;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    fail(ctx, 404, "NOT_FOUND", "用户不存在");
    return;
  }
  ok(ctx, { user: safeUser(user) }, "OK");
});

router.post("/refresh", async (ctx) => {
  const token = ctx.cookies.get(config.cookieName);
  if (!token) {
    fail(ctx, 401, "UNAUTHORIZED", "缺少刷新令牌");
    return;
  }

  let payload;
  try {
    payload = verifyRefreshToken(token);
  } catch (_) {
    fail(ctx, 401, "UNAUTHORIZED", "刷新令牌无效");
    return;
  }

  const record = await prisma.refreshToken.findUnique({ where: { tokenHash: sha256(token) } });
  if (!record || record.expiresAt.getTime() < Date.now()) {
    fail(ctx, 401, "UNAUTHORIZED", "刷新令牌已过期");
    return;
  }

  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user) {
    fail(ctx, 401, "UNAUTHORIZED", "用户不存在");
    return;
  }

  const accessToken = signAccessToken({ sub: user.id, email: user.email, username: user.username });
  ok(ctx, { accessToken, user: safeUser(user) }, "OK");
});

router.post("/logout", async (ctx) => {
  const token = ctx.cookies.get(config.cookieName);
  if (token) {
    await prisma.refreshToken.deleteMany({ where: { tokenHash: sha256(token) } });
  }
  clearRefreshCookie(ctx);
  ok(ctx, { ok: true }, "已退出");
});

module.exports = router;
