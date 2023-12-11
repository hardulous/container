const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("../package.json").dependencies;

const devConfig = {
  mode: "development",
  devServer: {
    port: 3000,
    historyApiFallback: {
      index: "/index.html",
    },
  },
  output: {
    publicPath: "http://localhost:3000/",
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
        cake: "cake@http://localhost:3001/remoteEntry.js",
        iceCream: "iceCream@http://localhost:3002/remoteEntry.js",
      },
      shared: {
        ...deps,
      },
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
