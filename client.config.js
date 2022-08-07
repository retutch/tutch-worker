const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    activity: path.join(__dirname, 'src', 'demo.js'),
  },
  output: {
    filename: 'client.js',
    path: __dirname,
  },
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
  },
  module: {
    rules: [{ test: /.tsx?$/, loader: 'awesome-typescript-loader' }],
  },
};
