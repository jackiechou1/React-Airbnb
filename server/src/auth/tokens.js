const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { config } = require("../config");

function sha256(input) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function signAccessToken(payload) {
  return jwt.sign(payload, config.accessSecret, { expiresIn: config.accessTokenTtl });
}

function signRefreshToken(payload) {
  const expiresInSeconds = config.refreshTokenTtlDays * 24 * 60 * 60;
  return jwt.sign(payload, config.refreshSecret, { expiresIn: expiresInSeconds });
}

function verifyAccessToken(token) {
  return jwt.verify(token, config.accessSecret);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, config.refreshSecret);
}

function generateOpaqueToken() {
  return crypto.randomBytes(48).toString("base64url");
}

module.exports = {
  sha256,
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateOpaqueToken,
};

