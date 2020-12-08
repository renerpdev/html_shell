const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack'); // to access built-in plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const pages = ['index'];

module.exports = {
    output: {
        filename: "[name].js",
        path: path.resolve('./dist')
    },
    module: {
        rules: [
            {
                test: require.resolve('jquery'),
                loader: 'expose-loader',
                options: {
                    exposes: ['$', 'jQuery'],
                },
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader?minimize=false",
                    }
                ]
            },
            {
                test: /\.pug$/,
                use: ['pug-loader?pretty=true']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(jpg|png|gif|svg)$/i,
                exclude: /node-modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'img/[name].[ext]'
                        }
                    }
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'webfonts/[name].[ext]'
                    }
                }
                ]
            },
        ],
    },

    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                { from: './src/vendors', to: './vendors' },
                { from: './src/fonts', to: './webfonts' },
            ],
        }),
    ].concat(pages.map(function (page) {
        return new HtmlWebpackPlugin({
            template: path.resolve(`./src/pages/${page}.pug`),
            filename: `./${page}.html`
        })
    })),
};
