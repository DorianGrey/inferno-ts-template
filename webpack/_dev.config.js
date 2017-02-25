const NamedModulesPlugin = require("webpack/lib/NamedModulesPlugin");
const devServerConfig = require("./_dev-server.config.js");

const {
        root
      } = require("./_constants");

module.exports = (env = {}) => {
  return {
    output: {
      path: root(".tmp")
    },
    devtool: "inline-source-map",
    devServer: devServerConfig,
    plugins: [
      new NamedModulesPlugin()
    ]
  };
};