const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    mode: 'production',
    //The base directory, an absolute path, for resolving entry points and loaders from configuration.
    context: path.join(__dirname, "src"),
    //Make sure HMR is injected when processing main.js. 
    entry: {
        main: [
            "./main"
        ]
    },

    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist")
    },

    resolve: {
        extensions: ['*', '.css', '.js', '.jsx'],
        modules: [
            path.join(__dirname, 'node_modules')
        ]
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
        new CopyWebpackPlugin(
            [{
                    from: 'images/*',
                    to: path.join(__dirname, "dist")
                },
                {
                    from: 'vendor/*',
                    to: path.join(__dirname, "dist")
                },
                {
                    from: 'pages/*',
                    to: path.join(__dirname, "dist")
                }

            ]),
        new webpack.NamedModulesPlugin(),
        new UglifyJsPlugin({
            test: /\.js($|\?)/i
        })
    ]
};