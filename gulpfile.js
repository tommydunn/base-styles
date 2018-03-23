'use strict';

const gulp = require("gulp"),
  replace = require('gulp-replace'),
  converter = require('sass-convert'),
  bump = require('gulp-bump'),
  autoPrefixer = require('gulp-autoprefixer'),
  rename = require('gulp-rename'),
  notify = require('gulp-notify'),
  sass = require('gulp-sass');

  gulp.task('css', function () {
    return gulp.src('./scss/tld-styles.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dist'));
  });
  
gulp.task('css:min', function () {
  return gulp.src('./scss/tld-styles.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .on("error", notify.onError({
      message: "Error: <%= error.message %>",
      title: "Error running something"
    }))
    .pipe(autoPrefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('bump:major', function () {
  var options = {
    type: 'major'
  };
  return gulp.src('./package.json')
    .pipe(bump(options))
    .pipe(gulp.dest('./'));
});

gulp.task('bump:minor', function () {
  var options = {
    type: 'minor'
  };
  return gulp.src('./package.json')
    .pipe(bump(options))
    .pipe(gulp.dest('./'));
});

gulp.task('bump:patch', function () {
  var options = {
    type: 'patch'
  };
  return gulp.src('./package.json')
    .pipe(bump(options))
    .pipe(gulp.dest('./'));
});

gulp.task('build', gulp.series('css', 'css:min'));
