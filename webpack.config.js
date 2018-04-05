const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const rules = [
        { test: /\.(js|jsx)$/,
          use: [{ loader: 'babel-loader' }],
          exclude: [/node_modules/]
        },
        { test: /\.css$/,
          loader: ExtractTextPlugin.extract('css-loader')
        }
      ];
const extensions = ['.js', '.jsx', '.node'];

module.exports = [
  {
    entry: './examples/index.js',
    output: {
      path: __dirname,
      filename: 'bundle.js'
    },
    resolve: {
		  extensions
    },
    module: {
     rules
    },
    plugins: [
      new ExtractTextPlugin('index.css')
    ]
}];
