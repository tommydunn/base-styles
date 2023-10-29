import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import dartSass from 'sass';
import del from 'del';
import plumber from 'gulp-plumber';
import terser from 'gulp-terser';
import rename from 'gulp-rename';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import mergeStream from 'merge-stream';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import replace from 'gulp-replace';

const sass = gulpSass(dartSass);

  const config = {
    srcDir: 'scss/',
    distDir: 'dist/'
  }

const paths = {
  distributables: 'dist/',
  documents: {
    source: 'scss/',
    destination: 'dist/',
  }
}

function clean(done) {
  del.sync([config.distDir]);
  return done();
}

function styles() {
  // sass.sync() is faster than sass(): https://github.com/dlmanning/gulp-sass
  return gulp
    .src(`${config.srcDir}/**/*.scss`)
    // .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(postcss([autoprefixer({ cascade: false })]))
    // .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.distDir))
}

function optimizeStyles() {
  return gulp
    .src(`${config.distDir}/**/*.css`)
    .pipe(postcss([cssnano()]))
    // .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(config.distDir))
}

const build = gulp.series(
  gulp.parallel(styles),
  gulp.parallel(optimizeStyles)
)

const prod = gulp.series(clean, build);

export {
  clean,
  styles,
  optimizeStyles,
  prod
}
export default build

