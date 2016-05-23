var path = require('path')
var webpack = require('webpack')

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-hot-middleware/client',
        './app/public/index'
    ],
    output: {
        path: path.join(__dirname, 'app/public'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
        new webpack.DefinePlugin({
            __DEBUG__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false')),
            //__DEVELOPMENT__: true,
            //__DEVTOOLS__: true
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders: [{
                test: /\.(js|jsx)$/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react', 'stage-0'],
                    plugins: ['add-module-exports'] //解决 export default的问题，多一个  module.exports = exports['default'];
                },
                exclude: /node_modules/,
                include: path.join(__dirname, 'app', 'public')

        }, {
            test: /\.less/,
                loader: 'style!css!less'
            }, {
                test: /\.css$/,
                loader: 'style!css'
            }
        ]
    },
    externals: {
        'react': 'window.React',
        'react-dom': 'window.ReactDOM',
        'react-redux': 'window.ReactRedux',
        'react-router': 'window.ReactRouter',
        'redux': 'window.Redux',
    }
}
