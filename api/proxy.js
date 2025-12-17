const { createProxyMiddleware } = require("http-proxy-middleware");

function toSearchParams(query) {
  const params = new URLSearchParams();
  if (!query) return params;
  for (const [key, value] of Object.entries(query)) {
    if (key === "path") continue;
    if (value == null) continue;
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, String(v)));
    } else {
      params.set(key, String(value));
    }
  }
  return params;
}

function getUpstreamPath(req) {
  const fromRewrite = req.query && typeof req.query.path === "string" ? req.query.path : null;
  const rawPath = fromRewrite || req.url || "/";
  const pathOnly = rawPath.split("?")[0] || "/";
  const params = toSearchParams(req.query);
  const qs = params.toString();
  return qs ? `${pathOnly}?${qs}` : pathOnly;
}

module.exports = function (req, res) {
  const target = "http://codercba.com:1888/airbnb/api";
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: (path, request) => {
      if (path.startsWith("/api/")) return path.replace(/^\/api/, "");
      return getUpstreamPath(request);
    },
  })(req, res);
};
