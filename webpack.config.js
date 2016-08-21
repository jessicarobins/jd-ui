var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app/index.module.js',
  module: {
    loaders: [
      { test: require.resolve('angular'),
        loader: 'exports?window.angular'
      },
      { test: /\.js$/, 
        exclude: /node_modules/,
        loaders: ['ng-annotate', 'babel-loader?presets[]=es2015']},
      { test: /\.scss$/,
        loaders: ["style", "css", "sass"]},
      { test: /\.html$/,
        loader: "html" },
      { test: /\.svg/, 
        loader: "file" },
      { test: /\.png/, 
        loader: "file" }
    ]
  },
  output: { filename: 'index.module.js', path: 'dist' },
  resolve: {
    alias: {
      'jessdocs': __dirname + '/src/app/jessdocs.module'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'jessdocs',
      template: './src/index.html'
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      angular: "exports?window.angular!angular",
      _: "lodash",
      moment: "moment",
      tinycolor: "tinycolor2"
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
  ]
}