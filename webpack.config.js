const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TSConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'production', // 'development' | 'production
  entry: {
    index: './src/index.ts',
    main: './src/design/main.scss'
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
    libraryTarget: 'umd',
    publicPath: '/lib/',
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss'],
    plugins: [new TSConfigPathsPlugin({})]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1, url: false }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/design/fonts', to: 'fonts' }, // This will copy the `src/design/fonts` directory to `lib/fonts` directory
        { from: 'src/design/_colors.scss', to: '_colors.scss' },
        { from: 'LICENSE.txt', to: 'LICENSE.txt' },
        { from: 'README.md', to: 'README.md' },
        { from: 'package.json', to: 'package.json' }
      ]
    })
  ],
  externals: {
    react: 'react',
    'react-dom': 'reactDOM'
  }
};
