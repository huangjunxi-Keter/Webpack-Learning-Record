const path = require('path'); // nodejs核心模块，专门处理路径问题
/* 引入插件（Plugin） */
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// 返回处理样式的 loader（降重）
function getStyleLoader(pre) {
    return [
        // 将js中的css通过创建style标签添加到html文件中
        MiniCssExtractPlugin.loader,
        // 将css资源编译成commonjs的模块到js中
        "css-loader",
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env", // 能解决大多数样式兼容性问题
                    ]
                }
            }
        },
        pre
    ].filter(Boolean);
    // 过滤 undefined、null、空字符串等 == false的变量
}

module.exports = {
    // 入口
    entry: "./src/main.js", // 相对路径
    // 输出
    output: {
        // 所有文件的输出路径
        // __dirname nodejs的变量，代表当前文件的文件夹目录
        path: path.resolve(__dirname, "../dist"), // 绝对路径
        // 入口文件打包输出文件名称
        filename: 'js/main.js',
        // 打包前将path目录清空
        clean: true,
    },
    // 加载器
    module: {
        rules: [
            // loder的配置
            {
                test: /\.css$/, // 只检测.css文件
                // use执行循序是从右到左（或从下到上）
                use: getStyleLoader(),
            },
            {
                test: /\.less$/,
                /* 只能使用1个loader */
                // loader: 'xxx',
                /* 可以使用多个loader */
                // 'less-loader' 参数会被添加进配置
                use: getStyleLoader('less-loader'),
            },
            {
                // .s a或c ss 文件
                test: /\.s[ac]ss$/,
                // 'sass-loader' 参数会被添加进配置
                use: getStyleLoader('sass-loader'),
            },
            {
                test: /\.styl$/,
                use: getStyleLoader('stylus-loader'),
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
        new MiniCssExtractPlugin({
            filename: 'static/css/main.css'
        }),
        new CssMinimizerPlugin(),
    ],
    // 模式
    mode: 'production'
}