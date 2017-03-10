const {NoEmitOnErrorsPlugin} = require("webpack");
const UglifyJsPlugin         = require("webpack/lib/optimize/UglifyJsPlugin");
const HashedModuleIdsPlugin  = require("webpack/lib/HashedModuleIdsPlugin");

const BundleAnalyzerPlugin  = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const ExtractTextPlugin     = require("extract-text-webpack-plugin");
const ClosureCompilerPlugin = require("webpack-closure-compiler");

const {
        root
      } = require("./_constants");

module.exports = (env = {}) => {
  const plugins = [
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
    new ExtractTextPlugin("[name].[contenthash].css"),

    new HashedModuleIdsPlugin()
  ];

  if (env.useClosureCompiler) {
    plugins.push(
      new ClosureCompilerPlugin({
        compiler: {
          language_in: "ECMASCRIPT6",
          language_out: "ECMASCRIPT5"
          // Note: compilation_level: 'ADVANCED' does not work (yet?);
        },
        concurrency: 3,
      })
    );
    /* Recent output:
     Version: webpack 2.2.1
     Time: 12006ms
     Asset                                             Size  Chunks             Chunk Names
     0.chunk.f9a3db156c0b166feb59.js                1.67 kB       0  [emitted]
     bundle.be7624777d8e3aae3938.js                 72.3 kB       1  [emitted]  bundle
     bundle.62e9b34ce099a1ddb3d0700711c96643.css    2.98 kB       1  [emitted]  bundle
     index.html                                   496 bytes          [emitted]
     */
  } else {
    plugins.push(
      new UglifyJsPlugin({
        beautify: false,
        comments: false
      })
    );
    /* Recent output:
     Version: webpack 2.2.1
     Time: 7676ms
     Asset                                             Size  Chunks             Chunk Names
     0.chunk.f9a3db156c0b166feb59.js                1.73 kB       0  [emitted]
     bundle.be7624777d8e3aae3938.js                 77.6 kB       1  [emitted]  bundle
     bundle.62e9b34ce099a1ddb3d0700711c96643.css    2.98 kB       1  [emitted]  bundle
     index.html                                   496 bytes          [emitted]
     */
  }

  if (env.analyze) {
    plugins.push(new BundleAnalyzerPlugin({analyzerPort: 5000}));
  }

  return {
    output: {
      path: root(".dist")
    },
    devtool: false,

    plugins: plugins
  };

};