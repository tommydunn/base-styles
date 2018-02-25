const gulp = require("gulp"),
  replace = require('gulp-replace'),
  converter = require('sass-convert'),
  sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./scss/tld-styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist'));
});
