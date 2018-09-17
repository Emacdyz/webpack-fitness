const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

// improve readability of bundle errors
const WebpackDashboard = require('webpack-dashboard/plugin')
const DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin")
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: "html-loader"
      //     }
      //   ]
      // },
      {
        test: /\.scss$/,
        use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './scss/base.scss',
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new WebpackDashboard(),
    new DuplicatePackageCheckerPlugin(),
    new FriendlyErrorsWebpackPlugin(),
  ]
}