var gulp = require("gulp");
var cleanCSS = require('gulp-clean-css');
var less = require('gulp-less');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");


gulp.task("build", function(callback) {

    var myConfig = Object.create(webpackConfig);
    myConfig.entry = ['./app/public/index'];
    myConfig.devtool = false;

    myConfig.plugins = [].concat(
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    // run webpack
    webpack(myConfig, function(err, stats) {
        if (err) throw new console.log("webpack:build", err);
        console.log("[webpack:build]", stats);
        callback();
    });
});

gulp.task("start", function(callback) {
    var port = 8081;
    var myConfig = Object.create(webpackConfig);

    myConfig.debug = true;

    // Start a webpack-dev-server
    new WebpackDevServer(webpack(myConfig), {
        hot: true,
        publicPath: myConfig.output.publicPath,
        contentBase: './app/public/',

        stats: {
            colors: true,
            keepAlive: true
        }
    }).listen(port, "127.0.0.1", function(err) {
            console.log("[webpack-dev-server]", "http://127.0.0.1:" + port + "/static/bundle.js");
    });
});

gulp.task('less', function(){
    gulp.src('./node_modules/antd/style/index.less')
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(gulp.dest('./app/public/'));
})
