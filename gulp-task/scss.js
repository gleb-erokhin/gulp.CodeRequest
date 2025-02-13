import gulp from'gulp';

//Конфигурация
import path from'../gulp-config/path.js';
import app from'../gulp-config/app.js';

//Плагины
import plumber from'gulp-plumber';
import notify from'gulp-notify';
import sass from'gulp-sass';
import autoprefixer from'gulp-autoprefixer';
import webpCss from'gulp-webp-css';
import csso from'gulp-csso';
import gulpIf from'gulp-if';

//Обработка scss
/**
 * @autoprefixer - для префиксов, настройки описаны в packege.json
 * gulp-shorthand - для сокращения записей те которые можно сократить
 * webpCss - подключение webp файлов в scss файле.
 * app.isDev - будет работать только в запуске режима разработки
 * app.isProd - будет работать только в запуске режима продакшина
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
        .pipe(gulpIf(app.isProd, csso()))
        // .pipe(autoprefixer())
        .pipe(dest(path.scss.dest, { sourcemaps: app.isDev }))
}

module.exports = scss;