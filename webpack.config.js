'use strict;'

var path = require('path');

module.exports = [{
    name: 'web',
    cache: true,
    entry: {
        'main': './src/Main.tsx'
    },
    output: {
        path: './public/',
        filename: '[name].js',
        chunkFilename: '[chunkhash].js'
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            include: [
                path.resolve(__dirname, "src")
            ],
            loader: 'babel-loader?presets[]=es2015!ts-loader'
        }
        ],
        preLoaders: [
            {
                test: /\.js$/, loader: "source-map-loader"
            }
        ]
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    devtool: "source-map",
    plugins: []
}]