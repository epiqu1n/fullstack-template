/* eslint-disable @typescript-eslint/no-unused-vars */
import webpack, { Configuration } from 'webpack';
import { Configuration as DevServerConfig } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const config: Configuration & DevServerConfig = {
  entry: './client/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: 'eval-source-map', // inline-source-map?
  mode: process.env.NODE_ENV as 'development' | 'production' | undefined,
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
    // historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    // headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000/',
        secure: false
      },
      '/assets/**': {
        target: 'http://localhost:3000/',
        secure: false
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        // Use babel-loader w/ @babel/preset-typescript & react?
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html'
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  }
};

export default config;