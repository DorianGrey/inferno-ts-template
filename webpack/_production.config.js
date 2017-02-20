const {NoEmitOnErrorsPlugin} = require("webpack");
const UglifyJsPlugin         = require("webpack/lib/optimize/UglifyJsPlugin");

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
    ]
  };

};