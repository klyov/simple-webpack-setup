const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all"
    }
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ];
  }

  return config;
};

const filename = ext => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

module.exports = {
  // Указывает на базовый каталог для разрешения точек входа и загрузчиков из конфигурации
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: { main: "./index.js", analytics: "./analytics.js" },
  output: {
    filename: filename("js"),
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    // Для понимания импорта без указания расширения
    extensions: [".js", ".json", ".png"],
    // Для указания абсолютных путей
    alias: {
      "@models": path.resolve(__dirname, "src/models"),
      "@": path.resolve(__dirname, "src")
    }
  },

  optimization: optimization(),
  // dev derver
  devServer: {
    port: 3000,
    hot: isDev
  },
  plugins: [
    // Для создания index.html в результируещей директории с опцией шаблона
    // т. е. создание на основе нами созданного файла index.html в папке src
    new HtmlWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: isProd
      }
    }),
    // Для удаления неактуальных файлов в результируещей директории
    new CleanWebpackPlugin(),
    // Для копирования файлов в результируещую директорию
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "src/favicon.ico"),
        to: path.resolve(__dirname, "dist")
      }
    ]),
    new MiniCssExtractPlugin({
      filename: filename("css")
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        // Правило справа налево!!!
        // css-loader - позволяет webpackу понимать импорты файлов с расширением css и импортировать в js стили
        // style-loader - он в данном случае добавляет стили из css в секцию head в html
        // MiniCssExtractPlugin.loader - выносит css в отдельный файл
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // без перезагрузки
              hmr: isDev,
              relloadAll: true
            }
          },
          "css-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // без перезагрузки
              hmr: isDev,
              relloadAll: true
            }
          },
          "css-loader",
          "less-loader"
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // без перезагрузки
              hmr: isDev,
              relloadAll: true
            }
          },
          "css-loader",
          "sass-loader"
        ]
      },
      // file-loader - позволяет webpackу понимать импорты файлов с расширением (png|jpg|gif|svg) и импортировать в js
      { test: /\.(png|jpg|gif|svg)$/, use: ["file-loader"] },
      // file-loader - позволяет webpackу обрабатывать файлы с расширением (ttf|woff|woff2|eot)
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ["file-loader"]
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"]
      },
      {
        test: /\.csv$/,
        use: ["csv-loader"]
      }
    ]
  }
};
