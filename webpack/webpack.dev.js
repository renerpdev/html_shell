const merge = require('webpack-merge');
const baseConfig = require('./webpack.common.js');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        inline: true,
        contentBase: path.resolve('./src'),
        port: '3001',
    },
    entry: {
        vendors: './src/vendors.js',
        main: './src/index.js',
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins:[
        // Minify CSS
        new webpack.LoaderOptionsPlugin({
            minimize: false,
        }),
    ]
});
