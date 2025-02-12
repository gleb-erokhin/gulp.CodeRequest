const { src, dest } = require('gulp');

//Конфигурация
const path = require('../gulp-config/path.js');
const app = require('../gulp-config/app.js');

//Плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const webp = require('gulp-webp');
const gulpIf = require('gulp-if');

//Обработка IMG
const img = () => {
    return src(path.img.src, {encoding: false})
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'IMAGE',
                message: error.message
            }))
        }))
        // проверка на новые фото чтобы старые не обрабатывать
        .pipe(newer(path.img.dest))
        // обработка фото webp
        .pipe(webp())
        // .pipe(dest(path.img.dest))
        // .pipe(src(path.img.src))
        // .pipe(newer(path.img.dest))
        // обработка фото и выгрузка
        // сработает только при запуске таска в пежиме продакшина
        // .pipe(gulpIf(app.isProd, imagemin(app.imagemin)))
        .pipe(imagemin(app.imagemin))
        .pipe(dest(path.img.dest))
}

module.exports = img;

/**
 * gulpIf нужен для выбора возможности запуска плагина в режиме разработки или продакшина, 1 параметр тип запуска, через запятую 2 параметр нужный плагин
 */