const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    activity: path.join(__dirname, 'src', 'worker.ts'),
  },
  output: {
    filename: 'worker.js',
    path: __dirname,
  },
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
  },
  module: {
    rules: [{ test: /.tsx?$/, loader: 'ts-loader' }],
  },
};
