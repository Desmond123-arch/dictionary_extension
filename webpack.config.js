const path = require('path');

const outputPath = 'dist';
const CopyPlugin = require("copy-webpack-plugin");

const entryPoints = {
    content: [
        path.resolve(__dirname, 'src', 'content.ts')
    ],
    background: path.resolve(__dirname, 'src', 'background.ts'),
    popUp: path.resolve(__dirname, 'src', 'popUp.ts')
}
module.exports = {
  entry: entryPoints,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, outputPath),
  },
  plugins: [
    new CopyPlugin({
        patterns: [{ from: '.', to: '.', context: 'public' }]
    }),
  ],
};