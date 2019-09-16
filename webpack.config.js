const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve')

const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
}

const serveOptions = {
  port: 5000,
  historyFallback: {
    index: '/index.html',
    verbose: true,
  },
  client: {
    retry: true,
  },
  static: [PATHS.build],
}

const config = {
  mode: 'development',
  watch: true,
  entry: [
    'webpack-plugin-serve/client',
    path.join(PATHS.src, 'index.js'),
  ],
  output: {
    filename: 'bundle.js',
    path: PATHS.build,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index_template.ejs',
      filename: 'index.html',
    }),
    new Serve(serveOptions),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [PATHS.src],
        exclude: [/node_modules/],
        loader: 'babel-loader',
      },
    ],
  },
}

module.exports = config
