/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack');

module.exports = {

    output: {
        path: "/assets",
        filename: 'main.js',
    },

    devtool: 'sourcemap',
    entry: [
        'webpack/hot/only-dev-server',
        './app/public/components/main.jsx'
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: "babel",
            query: {
                presets:['es2015','react'],
                plugins: ['add-module-exports'] //解决 export default的问题，多一个  module.exports = exports['default'];
            }
        }, {
            test: /\.less/,
            loader: 'style-loader!css-loader!less-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]

};
