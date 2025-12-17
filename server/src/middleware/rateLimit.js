const WINDOW_MS = 10 * 60 * 1000;
const MAX_FAILS = 5;
const BLOCK_MS = 10 * 60 * 1000;

const state = new Map();

function getClientIp(ctx) {
  const xf = ctx.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  return ctx.request.ip || ctx.ip || "unknown";
}

function getBucket(ip) {
  const now = Date.now();
  let b = state.get(ip);
  if (!b) {
    b = { firstAt: now, fails: 0, blockedUntil: 0 };
    state.set(ip, b);
    return b;
  }

  if (now - b.firstAt > WINDOW_MS) {
    b.firstAt = now;
    b.fails = 0;
  }
  return b;
}

function isBlocked(ctx) {
  const ip = getClientIp(ctx);
  const b = getBucket(ip);
  return b.blockedUntil && b.blockedUntil > Date.now();
}

function recordFailure(ctx) {
  const ip = getClientIp(ctx);
  const b = getBucket(ip);
  b.fails += 1;
  if (b.fails >= MAX_FAILS) {
    b.blockedUntil = Date.now() + BLOCK_MS;
  }
}

function recordSuccess(ctx) {
  const ip = getClientIp(ctx);
  const b = getBucket(ip);
  b.fails = 0;
  b.firstAt = Date.now();
  b.blockedUntil = 0;
}

module.exports = { isBlocked, recordFailure, recordSuccess };

