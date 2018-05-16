const gulp = require('gulp');
const pug = require('gulp-pug');
const bsync = require('browser-sync');
const rollup = require('gulp-rollup');
const log = require('fancy-log');

const folder = {
  dev: './dev/',
  devCss: './dev/css',
  devJs: './dev/js',
  css: './css/',
  pug: './pug/',
  js: './js/'
};

//////////////////////////////////////////////

gulp.task('pug', () =>
  gulp.src(`${folder.pug}*.pug`)
  .pipe(pug({
    pretty: true
  }))
  .on('error', (error) => {
    log(`${error.message}\n`)
  })
  .pipe(gulp.dest(folder.dev))
);

//////////////////////////////////////////////

gulp.task('css', () =>
  gulp.src(`${folder.css}*.css`)
  .pipe(gulp.dest(folder.devCss))
);

//////////////////////////////////////////////

gulp.task('js', () =>
  gulp.src(`${folder.js}*.+(js|jsx)`)
  .pipe(rollup({
    input: `${folder.js}main.js`,
    output: {
      file: 'main.js',
      format: 'umd'
    }
  }))
  .pipe(gulp.dest(folder.devJs))
);

//////////////////////////////////////////////

gulp.task('bsync', ['css', 'js', 'pug'], () => {
  bsync({
    server: {
      baseDir: folder.dev
    },
    notify: false,
    open: false
  });
});

//////////////////////////////////////////////

gulp.task('reload', ['js', 'pug'], () => {
  bsync.reload();
});

//////////////////////////////////////////////

gulp.task('watch', () => {
  gulp.watch(`${folder.sass}**/*.css`, ['css']);
  gulp.watch(`${folder.js}**/*.js`, ['reload']);
  gulp.watch(`${folder.pug}**/*.pug`, ['reload']);
});

//////////////////////////////////////////////

gulp.task('build', ['css', 'js', 'pug']);

//////////////////////////////////////////////

gulp.task('default', ['bsync', 'watch']);
