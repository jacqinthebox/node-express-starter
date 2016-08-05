var gulp = require('gulp');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var minify = require('gulp-minify-css');
var nodemon = require('gulp-nodemon');

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;


gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({

    script: 'app.js',
    watch: ['app.js']
  })
  .on('start', function onStart() {
    if (!called) { cb(); }
    called = true;
  })
  .on('restart', function onRestart() {
    setTimeout(function reload() {
      browserSync.reload({
        stream: false
      });
    }, BROWSER_SYNC_RELOAD_DELAY);
  });
});

gulp.task('browser-sync', ['nodemon'], function () {

  browserSync({
    proxy: 'http://localhost:3000',
    port: 7000
  });
});


gulp.task('js',  function () {
  return gulp.src('app/src/js/*.js')
  .pipe(concat('plugin.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/assets/js'))
  .pipe(notify({ message: 'Finished minifying js!'}));

});


gulp.task('css', function(){
   gulp.src('app/src/css/*.css')
   .pipe(concat('styles.css'))
   .pipe(minify())
   .pipe(gulp.dest('app/assets/css'))
   .pipe(notify({ message: 'Finished uglifying css!'}))
   .pipe(browserSync.reload({ stream: true }));
})

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('copy', ['clean'], function () {
        return gulp.src(['app/src/img', 'app/src/fonts'], {
            base: 'app'
        }).pipe(gulp.dest('assets'));
});


gulp.task('serve', ['browser-sync'], function () {
  gulp.watch('app/src/**/*.js',   ['js', browserSync.reload]);
  gulp.watch('app/src/**/*.css',  ['css']);
  gulp.watch('app/src/**/*.html', ['bs-reload']);
});
