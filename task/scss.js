const { src, dest } = require('gulp');

//Конфигурация
const path = require('../config/path.js');
const app = require('../config/app.js');

//Плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sass = require('gulp-sass')(require('sass'));
// const autoprefixer = require('gulp-autoprefixer');
const webpCss = require('gulp-webp-css');
const gulpIf = require('gulp-if');

//Обработка scss
/**
 * @autoprefixer - для префиксов, настройки описаны в packege.json
 * gulp-shorthand - для сокращения записей те которые можно сократить
 * webpCss - подключение webp файлов в scss файле.
 * app.isDev - будет работать только в запуске режима разработки
 */
const scss = () => {
    return src(path.scss.src, { sourcemaps: app.isDev })
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'SCSS',
                message: error.message
            }))
        }))
        .pipe(sass())
        .pipe(webpCss())
        // .pipe(autoprefixer())
        .pipe(dest(path.scss.dest, { sourcemaps: app.isDev }))
}

module.exports = scss;