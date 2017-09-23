//------ Resources ------//
// https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js 
'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var jshint = require('gulp-jshint');
var sass        = require('gulp-sass');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');

gulp.task('build-css', function() {
  return gulp
    .src('./app/sass/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['./sass']
    }))
    .on('error', function(err) {
      var displayErr = gutil.colors.red(err);
      gutil.log(displayErr);
      gutil.beep();
      this.emit('end');
    })
    .pipe(gulp.dest('./public/web/css'))
    .pipe(browserSync.stream());
});

// gulp.task('build-pug', function() {
//   console.log("I'm here");
//   // copy any html files in source/ to public/
//   return gulp.src('./app/views/**/*.pug')
//     .pipe(pug())
//     .on('error', function(err) {
//       var displayErr = gutil.colors.red(err);
//       gutil.log(displayErr);
//       gutil.beep();
//       this.emit('end');
//     })
//     .pipe(gulp.dest('./public/web/html'));
// });

// gulp.task('jshint', function() {
//   return gulp.src('app.js')
//     .pipe(sass.sync().on('error', sass.logError))
//     .pipe(jshint())
//     .pipe(jshint.reporter('jshint-stylish'))
//     .pipe(gulp.dest('public/web/js'));
// });

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'app.js',
    watch: ['app.js']
  })
  .on('start', function () {
    if (!called) {
      called = true; 
      cb();
    }
    })
  .on('restart', function () {
        browserSync.reload();
    });
});


gulp.task('sync', ['nodemon'], function() {
  browserSync.init({
    proxy: "http://localhost:3000",
    files: [
      'views/*.pug',
      'public/css/*.css',
    ],
    browser: "google chrome",
    port: 5000,
    reloadDelay: 1000
  })
  gulp.watch('./app/sass/**/*.scss', ['build-css'])
  // gulp.watch("./app/views/**/*.pug", ['build-pug']).on('change', browserSync.reload)
  // gulp.watch("app.js", ['jshint']).on('change', browserSync.reload)

});

gulp.task('default', ['sync','build-css','nodemon']);

// gulp.task('js-watch', ['jshint'], function (done) {
//     browserSync.reload();
//     done();
// });


