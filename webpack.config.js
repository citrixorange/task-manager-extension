const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        pop: './src/pop.js',
        tab: './src/tab.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/pop.html',
            filename: 'pop.html',
            chunks: ['pop'],
        }),
        new HtmlWebpackPlugin({
            template: './public/tab.html',
            filename: 'tab.html',
            chunks: ['tab'],
        }),
        new CopyWebpackPlugin({
            patterns: [
              { from: 'manifest.json', to: 'manifest.json' },
              { from: 'images', to: 'images' },
            ],
        }),
    ],
};
