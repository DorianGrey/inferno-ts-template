const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const srcRoot = path.resolve(__dirname, "..");

function root(...segments) {
  return path.resolve(srcRoot, ... segments);
}


exports.root = root;

exports.NODE_CONFIG = {
  global: true,
  crypto: "empty",
  process: true,
  module: false,
  clearImmediate: false,
  setImmediate: false
};

exports.getHtmlTemplatePlugin = function getHtmlTemplatePlugin(isDevMode) {
  return new HtmlWebpackPlugin({
    template: "src/index.template.html",
    filename: "index.html", // Keep in mind that the output path gets prepended to this name automatically.
    inject: "body",
    // Custom config.
    title: "Demo App",
    devMode: isDevMode,
    baseHref: "/"
  });
};
