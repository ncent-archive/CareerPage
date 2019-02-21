const webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "production",
  entry: "./client/src/index.jsx",
  output: {
    path: path.resolve(__dirname, "client/dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/env",
            "@babel/react"
          ]
        }
      },
      {
        test: /\.css$/i,
        loader: "style-loader@css-loader"
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8912
        }
      }
    ]
  },
  devtool: "source-map"
}