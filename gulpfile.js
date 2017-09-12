 
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var gutil = require('gulp-util');

gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});

gulp.task('copyPug', function() {
  // copy any html files in source/ to public/
  gulp.src('app/pages/*.pug').pipe(gulp.dest('public'));
});

gulp.task('jshint', function() {
  return gulp.src('app/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function() {
  gulp.watch('ap/js/**/*.js', ['jshint']);
});

//-
// 'use strict';
 
// var gulp        = require('gulp');
// var browserSync = require('browser-sync').create();
// var sass        = require('gulp-sass');

// gulp.task('default', function() {
//   // place code for your default task here
// });

 
// gulp.task('sass', function () {
//   return gulp.src('./sass/**/*.scss')
//     .pipe(sass.sync().on('error', sass.logError))
//     .pipe(gulp.dest('./css'));
// });
 
// gulp.task('sass:watch', function () {
//   gulp.watch('app/sass/*.scss', ['sass']);
// });

// // Static Server + watching scss/pug files
// gulp.task('serve', ['sass'], function() {

//     browserSync.init({
//         server: "./app"
//     });

//     gulp.watch("app/sass/*.scss", ['sass']);
//     gulp.watch("app/pages/*.pug").on('change', browserSync.reload);
// });

// // Compile sass into CSS & auto-inject into browsers
// gulp.task('sass', function() {
//     return gulp.src("app/scss/*.scss")
//         .pipe(sass())
//         .pipe(gulp.dest("app/css"))
//         .pipe(browserSync.stream());
// });
// // process JS files and return the stream.
// gulp.task('js', function () {
//     return gulp.src('index.js')
//         .pipe(browserify())
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
// });

// // create a task that ensures the `js` task is complete before
// // reloading browsers
// gulp.task('js-watch', ['js'], function (done) {
//     browserSync.reload();
//     done();
// });

// // use default task to launch Browsersync and watch JS files
// gulp.task('default', ['js'], function () {

//     // Serve files from the root of this project
//     browserSync.init({
//         server: {
//             baseDir: "./"
//         }
//     });

//     // add browserSync.reload to the tasks array to make
//     // all browsers reload after tasks are complete.
//     gulp.watch("js/*.js", ['js-watch']);
// });

// gulp.task('default', ['serve']);