const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const bsync = require('browser-sync');
const prefixer = require('gulp-autoprefixer');

const babel = require('gulp-babel');
const concat = require('gulp-concat');

const path = require('path');
const data = require('gulp-data');
const log = require('fancy-log');
const wait = require('gulp-wait');
const maps = require('gulp-sourcemaps');

const folder = {
  dev: './dev/',
  devCss: './dev/css',
  devJs: './dev/js',
  devImg: './dev/img',
  data: './pug/data/',
  sass: './sass/',
  pug: './pug/',
  js: './js/',
  img: './img/'
};

//////////////////////////////////////////////

gulp.task('pug', () =>
  gulp.src(`${folder.pug}*.pug`)
  .pipe(data((file) =>
    require(`${folder.data}${path.basename(file.path, '.pug')}.json`)
  ))
  .pipe(pug({
    pretty: true
  }))
  .on('error', (error) => {
    log(`${error.message}\n`)
  })
  .pipe(gulp.dest(folder.dev))
);

//////////////////////////////////////////////

gulp.task('sass', () =>
  gulp.src(`${folder.sass}*.+(scss|sass)`)
  .pipe(wait(300))
  .pipe(maps.init())
  .pipe(sass({
    includePaths: [folder.sass],
    outputStyle: 'compact',
    debugInfo: true,
    sourceComments: false
  }))
  .on('error', sass.logError)
  .pipe(maps.write())
  .pipe(prefixer([
    'last 15 versions', '> 1%'
  ], {
    cascade: true
  }))
  .pipe(gulp.dest(folder.devCss))
  .pipe(bsync.reload({
    stream: true
  }))
);

//////////////////////////////////////////////

gulp.task('js', () =>
  gulp.src(`${folder.js}*.+(js|jsx)`)
  .pipe(maps.init())
  .pipe(babel({
    presets: ['env']
  }))
  .pipe(concat('main.js'))
  .pipe(maps.write())
  .pipe(gulp.dest(folder.devJs))
);

//////////////////////////////////////////////

gulp.task('img', () =>
  gulp.src(`${folder.img}*.+(svg|jpg|jpeg|png|gif)`)
  .pipe(gulp.dest(folder.devImg))
);

//////////////////////////////////////////////

gulp.task('bsync', ['sass', 'js', 'pug'], () => {
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
  gulp.watch(`${folder.sass}**/*.+(scss|sass)`, ['sass']);
  gulp.watch(`${folder.js}**/*.js`, ['reload']);
  gulp.watch(`${folder.pug}**/*.pug`, ['reload']);
});

//////////////////////////////////////////////

gulp.task('build', ['img', 'sass', 'js', 'pug']);

//////////////////////////////////////////////

gulp.task('default', ['bsync', 'watch', 'img']);

//////////////////////////////////////////////
