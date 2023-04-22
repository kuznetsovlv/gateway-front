const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const PostCSSPresetEnv = require('postcss-preset-env');
const ESLintPlugin = require('eslint-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const development = process.env.NODE_ENV === 'development';
const production = !development;

const getPlugins = () => {
  const plugins = [
    new HTMLWebpackPlugin({ template: './assets/index.html' }),
    new MiniCSSExtractPlugin({ filename: '[name].[contenthash].css' })
  ];

  if (development) {
    plugins.push(new ESLintPlugin({ extensions: ['js', 'jsx'], fix: true }));
  }

  if (production) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
};

module.exports = {
  mode: development ? 'development' : 'production',
  target: development ? 'web' : 'browserslist',
  devtool: development ? 'source-map' : undefined,
  context: resolve(__dirname, 'src'),
  entry: ['@babel/polyfill', './index.jsx'],
  watch: development,
  output: {
    chunkFilename: '[name].[contenthash].js',
    filename: '[name].[contenthash].js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
    assetModuleFilename: 'assets/[hash][ext]'
  },
  devServer: {
    port: 8080,
    open: development,
    hot: false,
    historyApiFallback: true,
    client: { logging: 'warn', progress: development },
    proxy: { '/api/v1/': 'http://localhost:8000' },
    liveReload: development
  },
  watchOptions: {
    aggregateTimeout: 200,
    poll: 500
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      api: resolve(__dirname, 'src', 'api'),
      globalConstants: resolve(__dirname, 'src', 'constants'),
      components: resolve(__dirname, 'src', 'components'),
      pages: resolve(__dirname, 'src', 'pages'),
      utils: resolve(__dirname, 'src', 'utils'),
      types: resolve(__dirname, 'src', 'types'),
      StoreProvider: resolve(__dirname, 'src', 'StoreProvider'),
      routes: resolve(__dirname, 'src', 'routes.js'),
      icon: resolve(__dirname, 'src', 'icon')
    }
  },
  optimization: {
    splitChunks: { chunks: 'all' }
  },
  plugins: getPlugins(),
  module: {
    rules: [
      { test: /\.html$/, loader: 'html-loader' },
      {
        test: /\.s?css$/,
        use: [
          production ? MiniCSSExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: { postcssOptions: { plugins: [PostCSSPresetEnv] } }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.woff2?$/,
        type: 'asset/resource',
        generator: { filename: 'fonts/[name][ext]' }
      },
      {
        test: /\.(jpe?g|png|webp|gif|svg)?$/,
        type: 'asset/resource'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
