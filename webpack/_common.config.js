const path = require("path");

const {
        DefinePlugin,
        ProgressPlugin
      }               = require("webpack");
const {CheckerPlugin} = require("awesome-typescript-loader");


const {
        root,
        NODE_CONFIG,
        RULE_SASS_LOADING,
        getHtmlTemplatePlugin,
        getPerformanceOptions
      } = require("./_constants");

module.exports = (env = {}) => {

  const output = env.IS_DEV ? {
      filename: "[name].js",
      chunkFilename: "[id].chunk.js"
    } : {
      filename: "[name].[chunkhash].js",
      chunkFilename: "[id].chunk.[chunkhash].js"
    };

  return {
    entry: {
      bundle: root("src/main.tsx")
    },
    output: output,

    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      alias: {
        "react": "inferno-compat",
        "react-dom": "inferno-compat"
      }
    },

    module: {
      rules: [
        {
          test: /\.tsx?/,
          use: ["babel-loader", "awesome-typescript-loader"],
          exclude: /node_modules/
        },
        RULE_SASS_LOADING(env.IS_DEV)
      ]
    },

    performance: getPerformanceOptions(env.IS_DEV),

    /**
     * Include polyfills or mocks for various node stuff
     *
     * See: https://webpack.github.io/docs/configuration.html#node
     */
    node: NODE_CONFIG,
    plugins: [
      new DefinePlugin({
        ENV: JSON.stringify(process.env.NODE_ENV || "development"),
        "process.env": {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development")
        }
      }),
      new ProgressPlugin(),
      new CheckerPlugin(),
      getHtmlTemplatePlugin(env.IS_DEV)
    ]
  };

};