const path = require('path'); // nodejs核心模块，专门处理路径问题
/* 引入插件（Plugin） */
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 入口
    entry: "./src/main.js", // 相对路径
    // 输出
    output: {
        // 所有文件的输出路径
        // 开发模式没有输出
        path: undefined,
        // 入口文件打包输出文件名称
        filename: 'js/main.js',
    },
    // 加载器
    module: {
        rules: [
            // loder的配置
            {
                test: /\.css$/, // 只检测.css文件
                // use执行循序是从右到左（或从下到上）
                use: [
                    // 将js中的css通过创建style标签添加到html文件中
                    "style-loader",
                    // 将css资源编译成commonjs的模块到js中
                    "css-loader",
                ],
            },
            {
                test: /\.less$/,
                /* 只能使用1个loader */
                // loader: 'xxx',
                /* 可以使用多个loader */
                use: [
                    'style-loader',
                    'css-loader',
                    // 将 less 编译成 css 文件
                    'less-loader',
                ],
            },
            {
                // .s a或c ss 文件
                test: /\.s[ac]ss$/,
                use: [
                    // 将 JS 字符串生成为 style 节点
                    'style-loader',
                    // 将 CSS 转化成 CommonJS 模块
                    'css-loader',
                    // 将 Sass 编译成 CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.styl$/,
                use: [
                    // 将 JS 字符串生成为 style 节点
                    'style-loader',
                    // 将 CSS 转化成 CommonJS 模块
                    'css-loader',
                    // 将 Stylus 编译成 CSS
                    'stylus-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|webp|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        // 小于10kb的图片转base64
                        // 优点：减少请求数量，缺点：体积变大
                        maxSize: 100 * 1024
                    }
                },
                generator: {
                    // 输出图片的名字 hash 哈希值|ext 后缀名|query url传递的参数
                    filename: 'static/images/[hash:10][ext][query]'
                }
            },
            {
                test: /\.(ttf|woff2?|map3|map4|avi)$/,
                type: 'asset/resource', // resource会原封不动的输出文件
                generator: {
                    // 字体文件的输出名称
                    filename: 'static/fonts/[hash:10][ext][query]'
                }
            },
            {
                test: /\.(map3|map4|avi)$/,
                type: 'asset/resource', // resource会原封不动的输出文件
                generator: {
                    // 字体文件的输出名称
                    filename: 'static/media/[hash:10][ext][query]'
                }
            },
            {
                test: /\.m?js$/,
                // 排除 node_modules 目录，不进行处理
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            },
        ]
    },
    // 插件
    plugins: [
        // plugins的配置
        new ESLintPlugin({
            // 检测文件的路径
            context: path.resolve(__dirname, '../src')
        }),
        new HtmlWebpackPlugin({
            /*  
            *   模板：以public/index.html文件为模板，创建新的html文件
            *   新的html文件特点：
            *       1. 结构和原来一致
            *       2. 自动引入打包输出的资源
            */
            template: path.resolve(__dirname, '../public/index.html')
        }),
    ],
    // 模式
    mode: 'development',
    // webpack-dev-server
    devServer: {
        host: 'localhost', // 服务器域名
        port: '3001', // 服务器端口
        open: true, // 是否自动打开浏览器
    }
}