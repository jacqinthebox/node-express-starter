var gulp = require('gulp');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var nodemon = require('gulp-nodemon');

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;


gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({

    script: 'main.js',
    watch: ['main.js']
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
  return gulp.src('app/js/*.js')
  .pipe(concat('plugin.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/dist'))
  .pipe(notify({ message: 'Finished minifying JavaScript'}));

});

gulp.task('css', function () {
  return gulp.src('app/**/*.css')
  .pipe(browserSync.reload({ stream: true }));
})

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('serve', ['browser-sync'], function () {
  gulp.watch('app/**/*.js',   ['js', browserSync.reload]);
  gulp.watch('app/**/*.css',  ['css']);
  gulp.watch('app/**/*.html', ['bs-reload']);
});
