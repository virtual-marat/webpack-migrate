const webpack = require("webpack");
const path = require('path');

module.exports = {
  entry: {
    app: './src/index.ts',
    vendor: ['@angular/core'] /* included vendors */
  },
  output: {
    filename: '[name].js', /* [ app.js, vendor.js ] */
    path: __dirname + '/build'
  },
  mode: 'development',
  devServer: {
    contentBase: './build',
    /*
    * hide this:
    * WARNING in ./node_modules/@angular/core/fesm5/core.js
    * System.import() is deprecated and will be removed soon. Use import() instead.
    * */
    stats: 'errors-only'
  },
  module: {
    rules: [
      {
        test: /\.html$/, /* index.html */
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/, /* vendors from node_modules */
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  plugins:[
    /* workaround for https://github.com/angular/angular/issues/11580 */
    new webpack.ContextReplacementPlugin(
      /* the (\\|\/) piece accounts for path separators in *nix and Windows */
      /angular(\\|\/)core(\\|\/)(@angular|fesm5)/, path.resolve(__dirname, './build')
    )
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
}