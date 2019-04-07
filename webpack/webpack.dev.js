const merge = require('webpack-merge');
const baseConfig = require('./webpack.common.js');
const path = require('path');

module.exports = merge(baseConfig, {
    devtool: 'eval-source-map',

    devServer: {
        inline: true,
        contentBase: path.resolve('./src'),
        port: '3001',
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
});