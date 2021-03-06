var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('build:scss', function() {
  return gulp.src('./sass/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream({match: '**/*.css'}));
});

gulp.task('browser-sync', ['build:scss'], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch('./sass/*.scss', ['build:scss']);
});

gulp.task('default', ['browser-sync']);
