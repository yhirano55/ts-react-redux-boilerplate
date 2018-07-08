const autoprefixer = require('autoprefixer');

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    // your custom plugins
  ],
  module: {
    // add your custom rules.
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: "[name]-[local]-[hash:base64:5]",
              sourceMap: true
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
          },
        ],
      },
    ],
  },
};
