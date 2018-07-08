const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const isProduction = mode === 'production';
const outputFilename = isProduction ? 'bundle.[chunkhash].js' : '[name].js';

module.exports = {
  mode: mode,
  entry: "./src/index.tsx",
  output: {
    filename: outputFilename,
    path: __dirname + "/dist"
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json", ".css"]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
    })
  ]
}
