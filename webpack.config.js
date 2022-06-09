// development モードか否か？
const isDev = process.env.NODE_ENV === "development";

/** ↓ エディタで補完を効かせるための JSDoc */
/** @type {import('webpack').Configuration} */
module.exports = {
  // モードの切り替え
  mode: isDev ? "development" : "production",
  // dev モードではソースマップをつける
  devtool: isDev ? "source-map" : undefined,
  devServer: {
    static: {
      directory: "./dist",
    },
  },
  entry: {
    'main': './src/bundle/index.js',
    'material': './src/bundle/material.js',
    'light': './src/bundle/light.js',
    'shade': './src/bundle/shade.js',
  },
  output: {
    path: __dirname + '/dist/js',
    publicPath: '/js/',
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        // 拡張子 js のファイル（正規表現）
        test: /\.js$/,
        // ローダーの指定
        loader: "babel-loader",
      },
      {
        // 拡張子 css のファイル（正規表現）
        test: /\.s?css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              // dev モードではソースマップを付ける
              sourceMap: isDev,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
    ],
  },
};