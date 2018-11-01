const PATH = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const uglifyjs = require('uglifyjs-webpack-plugin');

// 按照配置文件， 将文件生成到 内存中吗?
module.exports = {
    mode : 'production',
    entry : {
        app : './src/js/app.js',
        admin : './src/js/admin.js'
        // test : ['./src/js/test.js', './src/js/test_two.js'],
        // orther : './src/js/test_orther.js'
    },
    output : {
        filename : '[name]-[hash:6].js',
        path : PATH.resolve(__dirname, '../dist')
    },
    optimization: {
        minimizer: [
          new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            template : './src/index.html',
            filename : 'index.html',
            chunks : ['app']
        }),
        new HtmlWebpackPlugin({
            template : './src/admin.html',
            filename : 'admin.html',
            chunks : ['admin']
        }),
        new CopyWebpackPlugin([{
            from : PATH.resolve(__dirname, '../static'),
            to : PATH.resolve(__dirname, '../dist/static')
        }]),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "styles/[name]-[hash:6].css"
        }),
        new uglifyjs()
    ],
    module : {
        rules : [
            {
                test : /\.(css|scss)$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader',  { loader: 'sass-loader'} ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            },
            {
                test: /\.html$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    { loader: 'string-loader',}
                ]
            }
        ]
    }
}