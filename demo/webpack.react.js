/**
 
npm i -D 
    webpack,
    html-webpack-plugin,
    babel-core,
    babel-preset-es2015,
    babel-preset-react
    react,
    react-dom,
    css-loader,
    style-loader

 */

var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.UglifyJsPlugin({minimize:true}),
     
        new HtmlWebpackPlugin({
            filename:'index.html'
        })
    ],
    entry:{
        app:path.resolve(__dirname,'./src/app.js'),
    },
    output:{
        path: path.resolve(__dirname,'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader','css-loader'] },
            {test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['es2015', 'react'],
                }
              }
            }
        ]
    }
};