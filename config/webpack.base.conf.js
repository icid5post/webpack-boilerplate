const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/',
};


module.exports = {
    // BASE config
    externals: {
        paths: PATHS
    },

    entry: {
        main: PATHS.src
    },
    output: {
        path: PATHS.dist,
        publicPath: '/',
        filename: `${PATHS.assets}js/[name].[hash].js`,
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }, {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {sourceMap: true}
                    }, {
                        loader: 'postcss-loader',
                        options: {sourceMap: true, config: {path: `./postcss.config.js`}}
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {sourceMap: true}
                    }, {
                        loader: 'postcss-loader',
                        options: {sourceMap: true, config: {path: `./postcss.config.js`}}
                    },
                    {
                        loader: 'sass-loader',
                        options: {sourceMap: true}
                    },
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/style.[hash].css`,
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: `${PATHS.src}/index.html`,
            filename: './index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: `${PATHS.src}/assets/img`,
                to: `${PATHS.assets}img`
            },
            {
                from: `${PATHS.src}/static`,
                to: ''
            }
        ])
    ]
}