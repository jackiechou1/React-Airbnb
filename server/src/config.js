const dotenv = require("dotenv");

dotenv.config();

function boolFromEnv(value, defaultValue) {
  if (value == null) return defaultValue;
  return String(value).toLowerCase() === "true";
}

const config = {
  port: Number.parseInt(process.env.PORT || "3001", 10),
  databaseUrl: process.env.DATABASE_URL,
  accessSecret: process.env.JWT_ACCESS_SECRET || "change_me_access",
  refreshSecret: process.env.JWT_REFRESH_SECRET || "change_me_refresh",
  accessTokenTtl: process.env.ACCESS_TOKEN_TTL || "15m",
  refreshTokenTtlDays: Number.parseInt(process.env.REFRESH_TOKEN_TTL_DAYS || "30", 10),
  cookieName: process.env.COOKIE_NAME || "airbnb_rt",
  cookieSecure: boolFromEnv(process.env.COOKIE_SECURE, false),
  cookieSameSite: process.env.COOKIE_SAMESITE || "lax",
};

module.exports = { config };

