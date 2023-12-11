// Webpack for production mode only

const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("../package.json").dependencies;

const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js", 
    publicPath: "https://demo-con.netlify.app/", 
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      filename: "remoteEntry.js",
      exposes: {
        "./pubSub": "./src/pub-sub/pubSub.js",
      },
      remotes: {
        cake: "cake@https://demo-cake.netlify.app/remoteEntry.js",
        iceCream: "iceCream@https://demo-icecream.netlify.app/remoteEntry.js",
      },
      shared: {
        ...deps,
      },
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
