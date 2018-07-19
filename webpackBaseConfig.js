const path = require('path');

// This module isn't used to build the documentation. We use Next.js for that.
// This module is used by the visual regression tests to run the demos.
module.exports = {
  context: path.resolve(__dirname),
  resolve: {
    modules: [path.join(__dirname, '../'), 'node_modules'],
    alias: {
      '@material-ui/core': path.resolve(__dirname, './packages/material-ui/src'),
      '@material-ui/docs': path.resolve(__dirname, './packages/material-ui-docs/src'),
      '@material-ui/icons': path.resolve(__dirname, './packages/material-ui-icons/src'),
      '@material-ui/lab': path.resolve(__dirname, './packages/material-ui-lab/src'),
      docs: path.resolve(__dirname, './'),
    },
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://sip-dev.dmka.cn',
        pathRewrite: { '^/api': '' },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.svg$/,
        loader: 'file-loader',
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
};
