import path from 'path';
import fs from "fs";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import { Configuration as WebpackConfig, HotModuleReplacementPlugin } from 'webpack';
import { Configuration as WebpackDevServerConfig } from 'webpack-dev-server';

type Configuration = WebpackConfig & {
  devServer?: WebpackDevServerConfig;
};

const config: Configuration = {
  mode: 'development',
  output: {
    publicPath: '/',
  },
  entry: './src/index.tsx',
  module: {
    rules: [
      /* -- JS/TS loader -- */
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },

      /* -- CSS loader --*/
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },

      /* -- File assets -- */
      {
        test: /\.(png|jpg|gif|jpeg)$/i,
        type: 'asset/resource'
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.jsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'public/index.html' }),
    new Dotenv(),
    new HotModuleReplacementPlugin(),
    new ESLintWebpackPlugin(),
  ],
  devtool: 'inline-source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    port: 4000,
    open: true,
    hot: true,
    https: {
      key: fs.readFileSync('cert/key.pem'),
      cert: fs.readFileSync('cert/cert.pem'),
    }
  },
};

export default config;
