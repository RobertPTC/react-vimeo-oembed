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
//NOTE if we are using eslint rules
// if (process.env.ENVIRONMENT === 'development') {
//   rules.push({test: /\.(js|jsx)$/,use:[{loader: 'eslint-loader'}],exclude: [/node_modules/]});
// }

//NOTE super simple webpack config
module.exports = [
  {
    entry: './src/index.js',
    output: {
      path: path.resolve(process.cwd(), './build'),
      filename: 'index.js'
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
