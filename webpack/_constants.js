const path              = require("path");
const {
        LoaderOptionsPlugin
      }                 = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

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

/**
 * For development mode, we'll use the style-loader to simplify importing things.
 * However, for production, we'll got with the extract text plugin to get a built css.
 */
exports.RULE_SASS_LOADING = function RULE_SASS_LOADING(isDev) {
  const scssLoaderChain = [
    {
      loader: "css-loader",
      options: {
        sourceMap: isDev,
        minimize: !isDev
      }
    },
    {
      loader: "postcss-loader",
      options: {
        sourceMap: isDev,
        plugins: function () {
          return [
            require("autoprefixer")({
              "browsers": ["last 2 versions"]
            })
          ]
        }
      }
    },
    {
      loader: "sass-loader",
      options: {
        sourceMap: isDev,
        outputStyle: isDev ? "nested" : "compressed"
      }
    }
  ];

  const result = {
    test: /\.scss$/
  };
  if (isDev) {
    result.use = ["style-loader"].concat(scssLoaderChain);
  } else {
    result.use = ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: scssLoaderChain
    });
  }
  return result;
};

exports.getPerformanceOptions = function getPerformanceOptions(isDevMode) {
  return {
    /**
     * Show performance hints / warnings / errors. Especially displays warnings about too large entry points and chunks.
     * This is not useful in development mode (since no optimization is performed at this stage), but for any production
     * mode.
     */
    hints: isDevMode ? false : "warning"
  };
};
