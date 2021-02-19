/* global require module __dirname */
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const presetsConfig = require("./build-utils/presets/loadPresets");
const modeConfig = (env) => require(`./build-utils/webpack.${env}`)(env);
const path = require("path");

module.exports = (_, { mode, env, presets }) => {
  // Set up environment variables
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
  return merge(
    {
      mode: mode,
      entry: {
        main: "./src/index.js",
      },
      output: {
        filename: "bundle.js",
      },
      module: {
        rules: [
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
          {
            test: /\.(png|jpg|gif)$/i,
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 5000,
                },
              },
            ],
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ["babel-loader"],
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: "index.html",
          favicon: "favicon.ico",
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin(),
        new webpack.DefinePlugin(envKeys),
      ],
      devServer: {
        contentBase: path.join(__dirname, "public"),
      },
      devtool: "source-map",
    },
    modeConfig(mode),
    presets ? presetsConfig(presets) : {}
  );
};
