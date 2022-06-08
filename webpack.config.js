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
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              // dev モードではソースマップを付ける
              sourceMap: isDev,
            },
          },
        ],
      },
    ],
  },
};