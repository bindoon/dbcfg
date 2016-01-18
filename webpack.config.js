var path = require('path')
var webpack = require('webpack')

module.exports = {
    devtool: 'eval',
    entry: [
        'webpack-hot-middleware/client',
        './app/public/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
        new webpack.DefinePlugin({
            __DEBUG__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
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
                    plugins: ['react-transform'],
                    extra: {
                        'react-transform': {
                            transforms: [{
                                transform: 'react-transform-hmr',
                                imports: ['react'],
                                locals: ['module']
                            }, {
                                transform: 'react-transform-catch-errors',
                                imports: ['react', 'redbox-react']
                            }]
                        }
                    }
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
    }
}
