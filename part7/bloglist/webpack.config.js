const path = require('path')
const webpack = require('webpack')
const config = (env, argv) => {
  const backend_url = argv.mode === 'production'
  ? 'https://blooming-atoll-75500.herokuapp.com/api/notes'
  : 'http://localhost:3001'

  return {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js'
    },
    devServer: {
      static: path.resolve(__dirname, 'build'),
      historyApiFallback: true,
      compress: true,
      port: 3000
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$|jsx/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }, 'postcss-loader']
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        BACKEND_URL: JSON.stringify(backend_url)
      })
    ]
  }
}

module.exports = config