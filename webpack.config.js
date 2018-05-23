const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body'
});

// To be able to use .env file
const webpack = require('webpack');
const myEnv = require('dotenv').config();
const myEnvPluginConfig = new webpack.DefinePlugin({
  REACT_APP_API_KEY: JSON.stringify(myEnv.parsed.REACT_APP_API_KEY)
});

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [{
      test:/\.css$/,
      use: [
        { loader: "style-loader" },
        { loader: "css-loader" },
        { loader: "sass-loader" }
      ]
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      query: {
    	  presets: ['es2015', 'react'],
        plugins: ["transform-object-rest-spread"]
      }
    },
    {
      test: /\.jsx$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      query: {
        presets: ['es2015', 'react'],
        plugins: ["transform-object-rest-spread"]
      }
    }]
  },
  plugins: [
    HtmlWebpackPluginConfig,
    myEnvPluginConfig
  ]
}
