'use strict'

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    webpack = require('webpack'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    del = require('del');

var config = require('./webpack.config');

/** 
 *  清理生产目录文件
 */
gulp.task('clean', function(cb) {
    del(['./dist/*.js','./dist/*.css','./dist/*.map']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
        cb();
    });
});


/** 
 *  执行webpack打包
 */
gulp.task('webpack',['clean'], function(cb) {
    webpack(config, cb)
});

/** 
 *  编译压缩css文件
 */
gulp.task('style', function() {
  return gulp.src('./src/assets/less/style.less')
    .pipe(less())
    .pipe(cssmin())
    .pipe(rename({
      // dirname: '',
      suffix: ''
    }))
    .pipe(gulp.dest('dist'));
});

/** 
 *  压缩js文件
 */
gulp.task('script',function(){
    gulp.src('./dist/*.js')
    // .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['webpack'], function() {
    console.log(process.env.NODE_ENV);
    gulp.start('style','script')
})
