const gulp = require('gulp');
const webpack = require('webpack-stream');
const eslint = require('gulp-eslint');

var paths = ['**/*.js', '!node_modules/**', '!db/**'];

gulp.task('lint:test', () => {
  return gulp.src(paths)
  .pipe(eslint({
    envs: [
      'mocha',
      'es6'
    ]
  }))
    .pipe(eslint.format());
});

gulp.task('lint:nontest', () => {
  return gulp.src(paths)
    .pipe(eslint({
      envs: [
        'es6'
      ]
    }))
    .pipe(eslint.format());
});

gulp.task('default', ['lint:test', 'lint:nontest']);
