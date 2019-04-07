const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseConfig = require('./webpack.common.js');

module.exports = merge(baseConfig, {
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },

    plugins: [
        // Extract imported CSS into own file
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        // Minify JS
        new UglifyJsPlugin({
            // sourceMap: false,
            // compress: true,
        }),
        // Minify CSS
        new webpack.LoaderOptionsPlugin({
            minimize: true,
        }),
    ],
});