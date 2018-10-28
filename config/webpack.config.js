const PATH = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// 按照配置文件， 将文件生成到 内存中吗?
module.exports = {
    mode : 'development',
    entry : {
        app : './src/js/app.js',
        admin : './src/js/admin.js'
        // test : ['./src/js/test.js', './src/js/test_two.js'],
        // orther : './src/js/test_orther.js'
    },
    output : {
        filename : ['name'].js,
        path : PATH.resolve(__dirname, '../dev')
    },
    devServer : {
        // 让服务器从这两个目录中响应资源
        // contentBase: [PATH.join(__dirname, "../dev"), PATH.join(__dirname, "../public")],
        contentBase: [PATH.join(__dirname, "../dev")], // ????
        compress: true,
        port: 9000,
        proxy: {
            '/api' : {
                target : 'http://localhost:3000'
            }
        }
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