const path = require('path');
const { merge } = require('webpack-merge');
const webpackCommon = require('./webpack.config.common');

const getBrowserName = () => {
  switch (process.platform) {
    case 'win32': return 'chrome';
    case 'darwin': return 'Google Chrome'; 
    default: return 'google-chrome'
  }
}

module.exports = merge(webpackCommon, {
  mode: 'development',
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    open: {
      target: ['http://localhost:3000/'],
      app: {
        name: getBrowserName(),
        arguments: ['--new-window'],
      },
    },
    compress: true,
    port: 3000,
  },
});