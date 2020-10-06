// Imports
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
require("@babel/register");

// Webpack Configuration
const config = {
  mode: "development",
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  // Entry
  entry: "./src/index.js",

  // Output
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "app.bundle.js",
  },
  // Plugins
  plugins: [
    new CleanWebpackPlugin(),
    new NodemonPlugin(),
  ],
  // Loaders
  module: {
    rules: [
      // JavaScript/JSX Files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  resolve: { modules: ["node_modules"] },
  // Development Tools (Map Errors To Source File)
  devtool: "source-map",
  optimization: {
    nodeEnv: false
  },
};
// Exports
module.exports = config;