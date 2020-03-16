const path = require("path")
const webpack = require("webpack")
const htmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
    entry: "./src/client/index.js",
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
    },
    devtool: 'source-map',
    stats: 'verbose',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath:'/',
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test: "/\.js$/",
                exclude: /node_modules/,
                loader: "babel.loader"
            },
            {
                test: /\.(png|svg|jpg|gif|webp)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader','resolve-url-loader', 'sass-loader' ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/client/view/index.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({filename: "[name].css"}),
        new WorkboxPlugin.GenerateSW()
    ]
}