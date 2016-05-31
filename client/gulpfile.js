const gulp = require('gulp');
const eslint = require('gulp-eslint');
const webpack = require('webpack-stream');

var clientFiles = [''];

gulp.task('webpack:dev', () => {
  gulp.src(__dirname + '/app/js/entry.js')
  .pipe(webpack({
    output: {
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loaders: [ 'babel-loader?presets[]=react' ]
        }
      ]
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('static:dev', () => {
  gulp.src(['app/**/*.html', 'app/**/*.css'])
  .pipe(gulp.dest('./build'));
});

gulp.task('build:dev', ['webpack:dev', 'static:dev']);
gulp.task('default', ['build:dev']);
