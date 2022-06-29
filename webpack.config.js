const path = require('path');

//引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
//引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
//webpack中所有的配置信息写在这里
module.exports = {
    mode: "development",//mode未设置会出现警告
    optimization:{
        minimize: false // 关闭代码压缩，可选
    },

    entry: "./src/index.ts",
    
    devtool: "inline-source-map",
    
    devServer: {
        contentBase: './dist'
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        environment: {
            arrowFunction: false // 关闭webpack的箭头函数，可选
        }
    },

    resolve: {
        extensions: [".ts", ".js"]
    },

    //指定webpack打包时要使用模块
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: "babel-loader",
                        options:{
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        "targets":{
                                            "chrome": "58",
                                            "ie": "11"
                                        },
                                        "corejs":"3",
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    {
                        loader: "ts-loader",
    
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },

    //配置webpack插件
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            //title:'自定义页面title',
            template: './src/index.html', //指定网页模板
        }),
    ],
}