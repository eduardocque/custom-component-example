const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const handlebarResolve = require("handlebars-webpack-plugin");

const DESTINATION = path.resolve(__dirname, "./dist/");
const entryPoint = "customComponent";

module.exports = {
  entry: {
    [entryPoint]: "./src/index-asset.js",
  },
  output: {
    path: DESTINATION,
    filename: "[name].js",
    chunkFilename: "[name].chunk.js",
    library: "Formatic",
    libraryTarget: "umd",
    crossOriginLoading: "anonymous",
  },
  externals: {
    formcorp: "formcorp",
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ], // [classic] will disable new JSX compiler and [automatic] will enable it
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-transform-runtime",
            ],
          },
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/",
            },
          },
        ],
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.(json)$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "/",
        },
        type: "javascript/auto",
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
        exclude: /(node_modules|bower_components)/,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new handlebarResolve({
      data: {
        title: "",
        jsPath: `${DESTINATION}/customComponent.js`,
      },
      output: path.join(process.cwd(), "dist", "[name].html"),
      entry: path.join(process.cwd(), "public", "index.html"),
    }),
  ],
  stats: {
    colors: true,
  },
  performance: false,
  devtool: "source-map",
};
