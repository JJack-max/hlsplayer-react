const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    popup: './src/pages/popup.tsx',
    player: './src/pages/player.tsx',
    background: './src/background.ts',
    content: './src/content.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/popup.html',
      filename: 'popup.html',
      chunks: ['popup']
    }),
    new HtmlWebpackPlugin({
      template: './public/player.html',
      filename: 'player.html',
      chunks: ['player']
    }),
    new CopyWebpackPlugin({
      patterns: [
        // 仅复制图标，移除对 hls.js 的复制
        {
          from: 'public/static/icon128.png',
          to: 'static/icon128.png'
        },
        {
          from: 'public/manifest.json',
          to: 'manifest.json'
        }
      ]
    })
  ]
};
