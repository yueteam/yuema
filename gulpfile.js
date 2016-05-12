var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');
var htmlreplace = require('gulp-html-replace');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var replace = require('gulp-replace');
var fs = require('fs'); 
var server = require('gulp-server-livereload'); 
var imagemin = require('gulp-imagemin'); 
  
var browserify = require('browserify');  
var source = require('vinyl-source-stream');  
var buffer = require('vinyl-buffer');
var globby = require('globby');
var through2 = require('through2');

var tempDir = './tmp';

/**
 * 合并压缩base文件
 * @return {[type]}   [description]
 */
gulp.task('base', function() {
    return gulp.src([
        './bower_components/zepto/src/zepto.js',
        './bower_components/zepto/src/selector.js',
        './bower_components/zepto/src/event.js',
        './bower_components/zepto/src/ajax.js',
        './bower_components/promise/src/polyfillB.debug.js',
        './bower_components/naver/jquery.jpanelmenu.js',
        './src/common/touch.js',
        './src/common/device.js'
    ])
        .pipe(concat('base.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));
});

gulp.task('imagemin', function() {
  return gulp.src([
      './src/images/**'
    ])
    .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true //类型：Boolean 默认：false 无损压缩
        }))
    .pipe(gulp.dest('./build/images'));
});

gulp.task('mobile', function(cb) {
  runSequence('mobile-clean', ['less2css', 'browserify'], 'mobile-clean', cb);
});

gulp.task('mobile-clean', function(cb) {
  return gulp.src(tempDir, {read:false})
    .pipe(clean({force: true}));
});

var packageAppRandomId = new Date().getTime();

gulp.task('mobile-html', function() {
  return gulp.src([
      './htmls/*.html'])
    // .pipe(htmlreplace({
    //     'htmltag': '<html>',
    //     'css': '../css/style' + packageAppRandomId + '.css',
    //     'js': '../js/main' + packageAppRandomId + '.js',
    //     'remove': ''
    // }))
    // .pipe(gulp.dest('./build/htmls-dist'));
    .pipe(through2.obj(function(file, enc, next) {
      console.log(file.path);
    }));
});

gulp.task('less2css', function() {
  return gulp.src([
      './src/pages/**/*.less',
    ])
    .pipe(less())
    .pipe(cssmin())
    .pipe(rename({
      dirname: '',
      suffix: ''
    }))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('browserify', function() {  

  return globby(['./src/pages/**/*.js']).then(function(entries) {
    
    entries.forEach(function(file) {
      console.log(file);
      var filename = file.substr(file.lastIndexOf('/') + 1);
      browserify(file)
        .bundle()
        .pipe(source(filename))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename({
          suffix: ''
        }))
        .pipe(gulp.dest('./build/js'));
    });

  }).catch(function(err) {
    console.log(err);
  });
  
});

gulp.task('watch', function () {
  gulp.watch('./src/**/*.less', ['less2css']); //当所有less文件发生改变时，调用mobile-css任务
  gulp.watch(['./src/**/*.js'], ['browserify']);
});

gulp.task('build', ['mobile']);

gulp.task('server', function() {
  gulp.src('./')
    .pipe(server({
      livereload: true,
      directoryListing: true,
      open: true
    }));

  gulp.watch('./src/**/*.less', ['less2css']); 
  gulp.watch(['./src/**/*.js'], ['browserify']);
}); 
