'use strict'

var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var isProduction = function() {
    return process.env.NODE_ENV === 'production';
}

//webpack插件
var plugins = [
    //提公用js到common.js文件中
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    //将样式统一发布到style.css中
    new ExtractTextPlugin("style.css", {
        allChunks: true,
        disable: false
    }),
    // 使用 ProvidePlugin 加载使用率高的依赖库
    new webpack.ProvidePlugin({
      $: 'webpack-zepto'
    })
];
var cdnPrefix = "",
    buildPath = "/dist/",
    publishPath = cdnPrefix + buildPath;

//编译输出路径
module.exports = {
    debug: true,
    entry: ['./src/main'],
    output: {
        path: __dirname + buildPath,
        filename: 'build.js',
        publicPath: publishPath,
        chunkFilename:"[id].build.js?[chunkhash]"
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue-loader',
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract(
                "style-loader", 'css-loader?sourceMap!sass-loader!cssnext-loader')
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract(
                "style-loader", 'css-loader?sourceMap!less-loader!cssnext-loader')
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
                "style-loader", "css-loader?sourceMap!cssnext-loader")
        }, {
            test: /\.js$/,
            exclude: /node_modules|vue\/dist/,
            loader: 'babel'
        }, {
            test: /\.(jpg|png|gif)$/,
            loader: "file-loader?name=images/[name].[ext]"
        }]
    },
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extension: ['', '.js'],
        //别名
        alias: {
            filter: path.join(__dirname, 'src/filters')
        }
    },
    plugins: plugins,
    devtool: 'source-map'
};
