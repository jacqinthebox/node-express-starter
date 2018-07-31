const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',

  //The base directory, an absolute path, for resolving entry points and loaders from configuration.
  context: path.join(__dirname, "src"),

  //Make sure HMR is injected when processing main.js. 
  entry: {
    main: [
      "webpack-hot-middleware/client?reload=true?",
      "./js/main"
    ]
  },

  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist")
  },

  //not sure if this is needed
  resolve: {
    extensions: ['*', '.css', '.js', '.jsx'],
    modules: [
      path.join(__dirname, 'node_modules')
    ]
  },

  devServer: {
    contentBase: "dist",
    overlay: true,
    hot: true,
    stats: {
      colors: true
    }
  },
  optimization: {
    noEmitOnErrors: true
  },
  module: {
    rules: [{
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new CopyWebpackPlugin([{
        from: 'images/*',
        to: path.join(__dirname, "dist")
      }, ,
      {
        from: 'vendor/*',
        to: path.join(__dirname, "dist")
      }
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};