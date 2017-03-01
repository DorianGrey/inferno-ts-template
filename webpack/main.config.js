const commonConfig = require("./_common.config");
const devConfig    = require("./_dev.config");
const prodConfig   = require("./_production.config");

const merge = require("webpack-merge");

const logger = require("log4js").getLogger("webpack-build");

module.exports = (env = {}) => {

  env.IS_DEV = process.env.NODE_ENV !== "production";

  logger.debug("Using build env config:", JSON.stringify(env, null, 4));
  logger.debug("Build mode:", env.IS_DEV ? "development" : "production");

  /** See the docs for more information about how merging configs is implemented:
   * https://github.com/survivejs/webpack-merge/blob/master/README.md
   *
   * The most important things in our case (using the default merging strategies) are:
   * - Hashes: Deep-merge
   * - Arrays: Concatenation
   *   => Exception: The array from "module.rules". The merge strategy replaces rules from that list
   *      if two conditions are met:
   *      (1) The `test` is equal.
   *      (2) The `loader` and/or `loaders` field cannot be merge, which is the case if at
   *          least one of them is an array.
   */
  return merge.smart(
    commonConfig(env),
    env.IS_DEV ? devConfig(env) : prodConfig(env)
  );
};