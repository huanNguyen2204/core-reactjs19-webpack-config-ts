import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ESLintWebpackPlugin from "eslint-webpack-plugin";
import * as webpack from 'webpack';
import * as dotenv from 'dotenv';
import { Configuration as WebpackConfig, HotModuleReplacementPlugin } from "webpack";
import { Configuration as WebpackDevServerConfig } from "webpack-dev-server";

type Configuration = WebpackConfig & {
  devServer?: WebpackDevServerConfig;
};

const env = dotenv.config().parsed;
const envKeys = env
  ? Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {} as Record<string, string>)
  : {};

const config: Configuration = {
  mode: "development",
  output: {
    publicPath: "/",
  },
  entry: "./src/index.tsx",
  module: {
    rules: [
      /* -- JS/TS loader -- */
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      },

      /* -- CSS loader --*/ 
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },

      /* -- File assets -- */
      {
        test: /\.(png|jpg|gif|jpeg)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".jsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "public/index.html" }),
    new webpack.DefinePlugin(envKeys),
    new HotModuleReplacementPlugin(),
    new ESLintWebpackPlugin(),
  ],
  devtool: "inline-source-map",
  devServer: {
    static: path.join(__dirname, "dist"),
    historyApiFallback: true,
    port: 8888,
    open: true,
    hot: true,
    // https: {
    //   key: fs.readFileSync('cert/key.pem'),
    //   cert: fs.readFileSync('cert/cert.pem'),
    // }
  },
};

export default config;
