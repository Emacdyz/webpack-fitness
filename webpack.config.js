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
        use: [
          "babel-loader",
          "eslint-loader",
        ],
      },
      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: "html-loader",
      //       options: { minimize: true },
      //     }
      //   ],
      // },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'url-loader?limit=7000',
          {
            loader: 'img-loader',
            options: {
              plugins: [
                // require('imagemin-gifsicle')({ // compress gif images
                //   interlaced: false
                // }),
                require('imagemin-mozjpeg')({ //compress jpeg images
                  progressive: true,
                  arithmetic: false
                }),
                // require('imagemin-pngquant')({ // compress png images
                //   floyd: 0.5,
                //   speed: 2
                // }),
                // require('imagemin-svgo')({ // Compress SVG images
                //   plugins: [
                //     { removeTitle: true },
                //     { convertPathData: false }
                //   ]
                // }) 
              ]
            }
          }
        ]
      },
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
      template: "./public/index.html",
      filename: "./index.html"
    }),
    new WebpackDashboard(),
    new DuplicatePackageCheckerPlugin(),
    new FriendlyErrorsWebpackPlugin(),
  ]
}