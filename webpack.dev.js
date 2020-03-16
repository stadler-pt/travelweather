const path = require("path")
const webpack = require("webpack")
const htmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
    entry: "./src/client/index.js",
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    devServer: {		//Proxy für Requests
        hot: true,
        port: 5000,
        proxy: {
            "/postData": {
              target: "http://localhost:7000",
              bypass: function(req, res, proxyOptions) {
                if (req.headers.accept.indexOf("html") !== -1) {
                  console.log("Skipping proxy for browser request.");
                  return "/index.html";
                }
              }
            },
            "/createNew": {
              target: "http://localhost:7000",
              bypass: function(req, res, proxyOptions) {
                if (req.headers.accept.indexOf("html") !== -1) {
                  console.log("Skipping proxy for browser request.");
                  return "/index.html";
                }
              }
            },
            "/sensible": {
                target: "http://localhost:7000",
                bypass: function(req, res, proxyOptions) {
                  if (req.headers.accept.indexOf("html") !== -1) {
                    console.log("Skipping proxy for browser request.");
                    return "/index.html";
                  }
                }
              },
            "/getData": {
                target: "http://localhost:7000",
                bypass: function(req, res, proxyOptions) {
                  if (req.headers.accept.indexOf("html") !== -1) {
                    console.log("Skipping proxy for browser request.");
                    return "/index.html";
                  }
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: "/\.js$/",
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
              test: /\.(png|svg|jpg|gif|webp)$/,
              use: [
                'file-loader',
              ],
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/client/view/index.html",
            filename: "index.html"
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new WorkboxPlugin.GenerateSW()
    ]
}