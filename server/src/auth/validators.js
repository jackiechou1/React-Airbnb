function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || ""));
}

function isStrongPassword(password) {
  const p = String(password || "");
  if (p.length < 8) return false;
  const hasLetter = /[A-Za-z]/.test(p);
  const hasNumber = /\d/.test(p);
  return hasLetter && hasNumber;
}

function validateRegisterBody(body) {
  const email = String(body?.email || "").trim().toLowerCase();
  const username = String(body?.username || "").trim();
  const password = String(body?.password || "");

  if (!email) return { ok: false, message: "请输入邮箱" };
  if (!isEmail(email)) return { ok: false, message: "邮箱格式不正确" };
  if (!username) return { ok: false, message: "请输入用户名" };
  if (!password) return { ok: false, message: "请输入密码" };
  if (!isStrongPassword(password)) return { ok: false, message: "密码至少 8 位，且包含字母与数字" };

  return { ok: true, email, username, password };
}

function normalizeLoginBody(body) {
  const account = String(body?.account || "").trim();
  const password = String(body?.password || "");
  if (!account) return { ok: false, message: "请输入账号（邮箱/用户名）" };
  if (!password) return { ok: false, message: "请输入密码" };
  return { ok: true, account, password };
}

module.exports = { validateRegisterBody, normalizeLoginBody };
