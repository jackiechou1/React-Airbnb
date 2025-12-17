const { createApp } = require("../../server/src/app");

const app = createApp();

module.exports = (req, res) => {
  return app.callback()(req, res);
};

