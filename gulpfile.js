//------ Resources ------//
// https://scotch.io/tutorials/automate-your-tasks-easily-with-gulp-js 

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var jshint = require('gulp-jshint');
var sass        = require('gulp-sass');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');

gulp.task('default', ['build-css','sync'], function () {
    gulp.watch('app/sass/*.scss', ['build-css']);
    gulp.watch('views/*.pug');
    browserSync.reload();
});

gulp.task('build-css', function() {
  return gulp.src('app/sass/*.scss')
    .pipe(sass({style: 'expanded'}))
        .on('error', gutil.log)
    .pipe(gulp.dest('public/web/css'))
    .pipe(browserSync.stream());
});

// gulp.task('copyPug', function() {
//   // copy any html files in source/ to public/
//   gulp.src('views/*.pug').pipe(gulp.dest('public/web/html'));
// });

// gulp.task('jshint', function() {
//   return gulp.src('app.js')
//     .pipe(sass.sync().on('error', sass.logError))
//     .pipe(jshint())
//     .pipe(jshint.reporter('jshint-stylish'))
//     .pipe(browserify())
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
        setTimeout(function () {
            browserSync.reload({ stream: false });
        }, 3000);
    });
});


gulp.task('watch', function() {
  // gulp.watch('app/js/*.js', ['jshint']);
  gulp.watch('app/sass/*.scss', ['build-css']);

  // gulp.watch('views/*.pug', ['copyPug'])
});

gulp.task('sync', ['nodemon'], function() {
  browserSync.init({
    proxy: "http://localhost:3000",
    files: [
      'views/*.pug',
      'public/css/*.css',
    ],
    browser: "google chrome",
    notify: false,
    port: 5000,
    ghostMode: false
  })
});

// gulp.task('js-watch', ['jshint'], function (done) {
//     browserSync.reload();
//     done();
// });


