const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const targetBrowser = process.env.TARGET_BROWSER || 'chrome';

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'inline-source-map' : false,

    entry: {
      popup: './src/popup/index.tsx',
      content: './src/content/contentScript.ts',
      background: './src/background/background.ts',
    },

    output: {
      path: path.resolve(__dirname, `dist/${targetBrowser}`),
      filename: '[name].js',
      clean: true,
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: isDevelopment,
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'icons/[name][ext]',
          },
        },
      ],
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),

      new HtmlWebpackPlugin({
        template: './src/popup/popup.html',
        filename: 'popup.html',
        chunks: ['popup'],
      }),

      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'src/icons',
            to: 'icons',
            noErrorOnMissing: true,
          },
          {
            from: `manifests/manifest.${targetBrowser}.json`,
            to: 'manifest.json',
            noErrorOnMissing: false,
          },
        ],
      }),
    ],

    optimization: {
      minimize: !isDevelopment,
      splitChunks: {
        chunks(chunk) {
          // Content scripts must be self-contained (no separate vendor chunks)
          // because Chrome extensions can't load chunk dependencies in content scripts
          return chunk.name !== 'content' && chunk.name !== 'background';
        },
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks(chunk) {
              // Only split vendor for popup, not for content or background scripts
              return chunk.name === 'popup';
            },
          },
        },
      },
    },

    performance: {
      hints: isDevelopment ? false : 'warning',
      maxAssetSize: 500000, // 500KB
      maxEntrypointSize: 500000,
    },
  };
};
