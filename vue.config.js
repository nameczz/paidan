const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    port: 8080,
    open: false,
    host: '0.0.0.0'
    // proxy: {
    //   '/u': {
    //     // 在这里设置开发api，否则会被mock.js干扰，倒是401
    //     target: 'http://10.8.8.233:8033',
    //     changeOrigin: true,
    //     ws: true, // proxy websockets
    //     pathRewrite: {
    //       '^/u': '/u'
    //     }
    //   }
    // }
  },
  configureWebpack: {
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              warnings: false,
              drop_console: true, // console
              drop_debugger: false,
              pure_funcs: ['console.log'] // 移除console
            }
          }
        })
      ]
    },
    externals: {
      AMap: 'AMap'
    }
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: ['./src/theme']
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  chainWebpack(config) {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 1024 }))
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))

    config
      .plugin('context')
      .use(webpack.ContextReplacementPlugin, [/moment[/\\]locale$/, /zh-cn/])
  }
}
