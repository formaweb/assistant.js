var gulp         = require('gulp'),
    del          = require('del'),

    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    minifyCSS    = require('gulp-csso'),
    rename       = require('gulp-rename'),
    sass         = require('gulp-sass'),
    uglify       = require('gulp-uglify');

var paths = {
  build:   'build/',
  scripts: 'source/**/*.js',
  styles:  'source/**/*.scss'
};

gulp.task('clean', function() {
  return del(['build']);
});

// TODO: Exclude locales.
gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
             .pipe(concat('assistant.js'))
             .pipe(gulp.dest(paths.build))

             .pipe(uglify())
             .pipe(rename({ extname: '.min.js' }))
             .pipe(gulp.dest(paths.build));
});

gulp.task('styles', function() {
  return gulp.src(paths.styles)
             .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
             .pipe(autoprefixer('last 3 version'))
             .pipe(gulp.dest(paths.build))

             .pipe(minifyCSS())
             .pipe(rename({ extname: '.min.css' }))
             .pipe(gulp.dest(paths.build));
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', ['watch', 'scripts', 'styles']);
gulp.task('release', ['scripts', 'styles']);
