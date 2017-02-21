const {NoEmitOnErrorsPlugin} = require("webpack");
const UglifyJsPlugin         = require("webpack/lib/optimize/UglifyJsPlugin");

const ExtractTextPlugin    = require("extract-text-webpack-plugin");

const {
        root
      } = require("./_constants");

module.exports = (env = {}) => {
  return {
    output: {
      path: root(".dist")
    },
    devtool: false,

    plugins: [
      // Plugin to let the whole build fail on any error; i.e. do not tolerate these
      new NoEmitOnErrorsPlugin(),
      /**
       * Plugin to properly minify the build output
       *
       * See: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
       */
      new UglifyJsPlugin({
        beautify: false,
        comments: false
      }),
      /**
       * Plugin to extract styles as css files; We're using this for the main.scss only atm.
       * This may optimize loading time in production mode since it may be cached by the browser separately.
       *
       * See: http://webpack.github.io/docs/stylesheets.html#separate-css-bundle
       */
      new ExtractTextPlugin("[name].[contenthash].css")
    ]
  };

};