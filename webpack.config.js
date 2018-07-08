const path = require('path');
const autoprefixer = require('autoprefixer');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const isProduction = mode === 'production';
const outputFilename = isProduction ? 'bundle.[chunkhash].js' : '[name].js';
const outputCssFilename = isProduction ? 'bundle.[chunkhash].css' : '[name].css';

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
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                modules: true,
                localIdentName: "[name]-[local]-[hash:base64:5]",
                sourceMap: true
              }
            },
            {
              loader: 'typed-css-modules-loader',
              options: {
                camelCase: true,
                searchDir: './src',
                outDir: './typings'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: [
                  autoprefixer()
                ]
              }
            }
          ]
        })
      },
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
    }),
    new ExtractTextPlugin({
      filename: outputCssFilename,
      allChunks: true
    }),
  ]
}
