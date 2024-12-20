const path = require('path');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'pageutilities',
    libraryTarget: 'umd',
  },
  plugins: [
    new NodePolyfillPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  mode: 'development',
};
