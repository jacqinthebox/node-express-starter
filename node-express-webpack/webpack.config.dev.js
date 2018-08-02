const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  mode: 'development',
  //The base directory, an absolute path, for resolving entry points and loaders from configuration.
  context: path.join(__dirname, "src"),

  //Make sure HMR is injected when processing main.js. 
  entry: {
    main: [
      //"webpack-hot-middleware/client?reload=true?",
      "./main"
    ]
  },

  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "dist")
  },

  resolve: {
    extensions: ['*', '.css', '.js'],
    modules: [
      //so you can import them (e.g. for Bootstrap)
      path.join(__dirname, 'node_modules')
    ]
  },

  devServer: {
    contentBase: "./dist",
    watchContentBase: true,
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
      },
      {
        from: 'pages/*',
        to: path.join(__dirname, "dist")
      }

    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      //express listens to this port
      proxy: 'http://localhost:3000/',
      //use webpackdevserver to reload
      reload: false
    }),
    new webpack.ProvidePlugin({
      'window.jQuery': 'jquery',
      'window.$': 'jquery',
    })
  ]
};