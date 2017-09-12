//------ Resources ------//
// https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js 

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var jshint = require('gulp-jshint');
var sass        = require('gulp-sass');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');

gulp.task('default', function() {
  return gutil.log('Gulp is running!')
});

gulp.task('copyPug', function() {
  // copy any html files in source/ to public/
  gulp.src('app/views/*.pug').pipe(gulp.dest('public/web'));
});

gulp.task('jshint', function() {
  return gulp.src('app.js')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(browserify())
    .pipe(gulp.dest('public/web/js'));
});

gulp.task('build-css', function() {
  return gulp.src('app/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/web/css'))
    .pipe(browserSync.stream());
});


gulp.task('nodemon', function (cb) {
  var started = false;
  return nodemon({
    script: 'app.js',
    watch: ['app.js', 'public/web/js/*.js']
  }).on('start', function () {
    if (!started) {
      started = true; 
      cb();
    } 
  });
});

gulp.task('watch', function() {
  gulp.watch('app/js/*.js', ['jshint']);
  gulp.watch('app/sass/*.scss', ['build-css']);
});

gulp.task('serve', ['build-css','nodemon'], function() {
  browserSync.init({
    proxy: "http://localhost:3000",
    files: [
      'app/views/*.pug',
      'public/css/*.css',
    ],
    browser: "chrome",
    notify: false,
    port: 3000,
    ghostMode: false
  }),

    gulp.watch("app/sass/*.scss", ['build-css']);
    gulp.watch("app/views/*.pug").on('change', browserSync.reload);
});

gulp.task('js-watch', ['jshint'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('default', ['serve']);