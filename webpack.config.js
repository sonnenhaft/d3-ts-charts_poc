const HtmlWebPackPlugin = require('html-webpack-plugin');
// const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  entry: {
    index: './index.ts',
    d3: 'd3'
  },
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: require('path').resolve(__dirname, 'build'),
    publicPath: '.'
  },
  devServer: {
    contentBase: '.'
  },
  module: {
    rules: [{ use: 'ts-loader', test: /\.ts$/, exclude: /node_modules/ }]
  },
  resolve: { extensions: ['.js', '.ts'] },
  plugins: [
    new HtmlWebPackPlugin({ template: "index.html" }),
    // new WriteFilePlugin()
  ]
};
