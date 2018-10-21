const PATH = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    mode : 'development',
    entry : {
        test : ['./src/js/test.js', './src/js/test_two.js'],
        orther : './src/js/test_orther.js'
    },
    output : {
        filename : ['name'].js,
        path : PATH.resolve(__dirname, '../dev/js')
    },
    devServer : {
        contentBase : [PATH.resolve(__dirname, '../dev')],
        compress: true,
        port: 9000
    },
    plugins : [
        new HtmlWebpackPlugin({
            template : './src/index.html',
            filename : 'myindex.html'
        }),
        new CopyWebpackPlugin([{
            from : PATH.resolve(__dirname, '../static'),
            to : PATH.resolve(__dirname, '../dev/static')
        }])
    ],
    module : {
        rules : [
            {
                test : /\.(css|scss)$/,
                use: [ // loader从后向前使用
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },                    
                    { loader: 'sass-loader' }                    
                ]
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
            }
        ]
    }
}