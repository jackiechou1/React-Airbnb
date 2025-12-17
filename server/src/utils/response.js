function ok(ctx, data = {}, message = "OK") {
  ctx.body = { code: "OK", message, data };
}

function fail(ctx, status, code, message) {
  ctx.status = status;
  ctx.body = { code, message, data: null };
}

module.exports = { ok, fail };

