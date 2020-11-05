const path = require('path')

module.exports = {
  lintOnSave: 'error',
  productionSourceMap: false,
  devServer: {
    port: 8081,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://server.test.haokegenjin.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      },
      '/login': {
        target: 'http://server.test.haokegenjin.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  },
  publicPath: './',
  chainWebpack: (config) => {
    config.module
      .rule('js')
      .exclude
      .add(path.join(__dirname, 'src', 'assets'))
      .add(path.join(__dirname, 'src', 'lib'))
      .add(path.join(__dirname, 'src', 'json-server-mock'))
      .end()

    config.module
      .rule('eslint')
      .exclude
      .add(path.join(__dirname, 'src', 'assets'))
      .add(path.join(__dirname, 'src', 'lib'))
      .end()
  }
}
